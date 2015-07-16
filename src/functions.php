<?php // ==== FUNCTIONS ==== //

// Load the configuration file for this installation; all options are set here
if ( is_readable( trailingslashit( get_stylesheet_directory() ) . 'functions-config.php' ) )
  require_once( trailingslashit( get_stylesheet_directory() ) . 'functions-config.php' );

// Load configuration defaults for this theme; anything not set in the custom configuration (above) will be set here
require_once( trailingslashit( get_stylesheet_directory() ) . 'functions-config-defaults.php' );

// An example of how to manage loading front-end assets (scripts, styles, and fonts)
require_once( trailingslashit( get_stylesheet_directory() ) . 'inc/assets.php' );

// Required to demonstrate WP AJAX Page Loader (as WordPress doesn't ship with simple post navigation functions)
require_once( trailingslashit( get_stylesheet_directory() ) . 'inc/navigation.php' );

// Only the bare minimum to get the theme up and running
function voidx_setup() {

  // Language loading
  load_theme_textdomain( 'voidx', trailingslashit( get_template_directory() ) . 'languages' );

  // HTML5 support; mainly here to get rid of some nasty default styling that WordPress used to inject
  add_theme_support( 'html5', array( 'search-form', 'gallery' ) );

  // $content_width limits the size of the largest image size available via the media uploader
  // It should be set once and left alone apart from that; don't do anything fancy with it; it is part of WordPress core
  global $content_width;
  if ( !isset( $content_width ) || !is_int( $content_width ) )
    $content_width = (int) 960;

  // Register header and footer menus
  register_nav_menu( 'header', __( 'Header menu', 'voidx' ) );
  register_nav_menu( 'footer', __( 'Footer menu', 'voidx' ) );

}
add_action( 'after_setup_theme', 'voidx_setup', 11 );

add_theme_support('post-thumbnails');

// Sidebar declaration
function voidx_widgets_init() {
  register_sidebar( array(
    'name'          => __( 'Main sidebar', 'voidx' ),
    'id'            => 'sidebar-main',
    'description'   => __( 'Appears to the right side of most posts and pages.', 'voidx' ),
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h2>',
    'after_title'   => '</h2>'
  ) );
}
add_action( 'widgets_init', 'voidx_widgets_init' );

//allow SVG uploads
  function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }
  add_filter('upload_mimes', 'cc_mime_types');
  
//Customizer Function
  function wpt_register_theme_customizer( $wp_customize ) {
    // Add Custom Logo Settings
      $wp_customize->add_section( 'custom_logo' , array(
        'title'      => __('Change Your Logo','wptthemecustomizer'), 
        'panel'      => 'design_settings',
        'priority'   => 20    
      ) );  
      $wp_customize->add_setting(
          'wpt_logo',
          array(
              'default'         => get_template_directory_uri() . '/img/logo.svg',
              //'transport'       => 'postMessage'
          )
      );
      $wp_customize->add_control(
           new WP_Customize_Image_Control(
               $wp_customize,
               'custom_logo',
               array(
                   'label'      => __( 'Change Logo', 'wptthemecustomizer' ),
                   'section'    => 'custom_logo',
                   'settings'   => 'wpt_logo',
                   'extensions' => array( 'jpg', 'jpeg', 'gif', 'png', 'svg' ),
                   'context'    => 'wpt-custom-logo' 
               )
           )
       ); 
    //Add Design Panel
      $wp_customize->add_panel( 'design_settings', array(
          'priority' => 20,
          'theme_supports' => '',
          'title' => __( 'Design Settings', 'wptthemecustomizer' ),
          'description' => __( 'Controls the basic design settings for the theme.', 'wptthemecustomizer' ),
      ) ); 
  }
  
//Load Customizer
  add_action( 'customize_register', 'wpt_register_theme_customizer' );

//Hide the admin bar
  add_filter('show_admin_bar', '__return_false');

// Disable support for comments and trackbacks in post types
    function df_disable_comments_post_types_support() {
      $post_types = get_post_types();
      foreach ($post_types as $post_type) {
        if(post_type_supports($post_type, 'comments')) {
          remove_post_type_support($post_type, 'comments');
          remove_post_type_support($post_type, 'trackbacks');
        }
      }
    }
    add_action('admin_init', 'df_disable_comments_post_types_support');

    // Close comments on the front-end
    function df_disable_comments_status() {
      return false;
    }
    add_filter('comments_open', 'df_disable_comments_status', 20, 2);
    add_filter('pings_open', 'df_disable_comments_status', 20, 2);

    // Hide existing comments
    function df_disable_comments_hide_existing_comments($comments) {
      $comments = array();
      return $comments;
    }
    add_filter('comments_array', 'df_disable_comments_hide_existing_comments', 10, 2);

    // Remove comments page in menu
    function df_disable_comments_admin_menu() {
      remove_menu_page('edit-comments.php');
    }
    add_action('admin_menu', 'df_disable_comments_admin_menu');

    // Redirect any user trying to access comments page
    function df_disable_comments_admin_menu_redirect() {
      global $pagenow;
      if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url()); exit;
      }
    }
    add_action('admin_init', 'df_disable_comments_admin_menu_redirect');

    // Remove comments metabox from dashboard
    function df_disable_comments_dashboard() {
      remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
    }
    add_action('admin_init', 'df_disable_comments_dashboard');

    // Remove comments links from admin bar
    function df_disable_comments_admin_bar() {
      if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
      }
    }
    add_action('init', 'df_disable_comments_admin_bar');

// ==== SHOTCODES (some basic shortcodes we will always use) ==== //

  // Custom Taxonomy Shortcode
      function list_terms_custom_taxonomy( $atts ) {

          // Inside the function we extract custom taxonomy parameter of our shortcode
          extract( shortcode_atts( array(
            'custom_taxonomy' => '',
          ), $atts ) );

        // arguments for function wp_list_categories
        $args = array( 
        taxonomy => $custom_taxonomy,
        title_li => ''
        );

        // We wrap it in unordered list 
        echo '<ul>'; 
        echo wp_list_categories($args);
        echo '</ul>';
      }

      // Add a shortcode that executes our function
      add_shortcode( 'ocular_category', 'list_terms_custom_taxonomy' );

      //Allow Text widgets to execute shortcodes
      add_filter('widget_text', 'do_shortcode');
