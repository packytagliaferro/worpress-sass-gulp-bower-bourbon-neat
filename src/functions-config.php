<?php // ==== CONFIGURATION (CUSTOM) ==== //

// Specify custom configuration values in this file; these will override values in `functions-config-defaults.php`
// The general idea here is to allow for themes to be customized for specific installations



// ==== CUSTOM POST SETUP (change name and names of page files to match) ==== //
	function custom_post_type() {

		$labels = array(
			'name'                => _x( 'Post Types', 'Post Type General Name', 'text_domain' ),
			'singular_name'       => _x( 'Post Type Name', 'Post Type Singular Name', 'text_domain' ),
			'menu_name'           => __( 'Post Type', 'text_domain' ),
			'name_admin_bar'      => __( 'Post Type', 'text_domain' ),
			'parent_item_colon'   => __( 'Parent Item:', 'text_domain' ),
			'all_items'           => __( 'All Items', 'text_domain' ),
			'add_new_item'        => __( 'Add New Item', 'text_domain' ),
			'add_new'             => __( 'Add New', 'text_domain' ),
			'new_item'            => __( 'New Item', 'text_domain' ),
			'edit_item'           => __( 'Edit Item', 'text_domain' ),
			'update_item'         => __( 'Update Item', 'text_domain' ),
			'view_item'           => __( 'View Item', 'text_domain' ),
			'search_items'        => __( 'Search Item', 'text_domain' ),
			'not_found'           => __( 'Not found', 'text_domain' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
		);

		$args = array(
			'label'               => __( 'post_type_slug', 'text_domain' ), //-------> the slug
			'description'         => __( 'Post Type Description', 'text_domain' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail'),
			'taxonomies'          => array(),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-admin-page',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,		
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'page',
		);
		register_post_type( 'post_type_slug', $args ); //-------> change to the slug

	}

	// Hook into the 'init' action
	add_action( 'init', 'custom_post_type', 0 );

	// ==== CUSTOM META FOR POST TYPE ==== //

	add_filter( 'rwmb_meta_boxes', 'your_prefix_meta_boxes' );
	function your_prefix_meta_boxes( $meta_boxes ) {
	    $meta_boxes[] = array(
	        'title'      => __( 'Test Meta Box', 'textdomain' ),
	        'post_types' => 'post_type_slug',
	        'fields'     => array(
	            array(
	                'id'   => 'name',
	                'name' => __( 'Name', 'textdomain' ),
	                'type' => 'text',
	            ),
	            array(
	                'id'      => 'gender',
	                'name'    => __( 'Gender', 'textdomain' ),
	                'type'    => 'radio',
	                'options' => array(
	                    'm' => __( 'Male', 'textdomain' ),
	                    'f' => __( 'Female', 'textdomain' ),
	                ),
	            ),
	            array(
	                'id'   => 'email',
	                'name' => __( 'Email', 'textdomain' ),
	                'type' => 'email',
	            ),
	            array(
	                'id'   => 'bio',
	                'name' => __( 'Biography', 'textdomain' ),
	                'type' => 'textarea',
	            ),
	            array(
	                'id'   => 'bg',
	                'name' => __( 'Biography', 'textdomain' ),
	                'type' => 'file_input',
	            ),
	        ),
	    );
	    return $meta_boxes;
	}

	// ==== CUSTOM TAXONOMY SETUP (change name and names of page files to match) ==== //
		function my_taxonomies_custom() {
		  $labels = array(
		    'name'              => _x( 'Post Categories', 'taxonomy general name' ),
		    'singular_name'     => _x( 'Post Category', 'taxonomy singular name' ),
		    'search_items'      => __( 'Search Post Categories' ),
		    'all_items'         => __( 'All Post Categories' ),
		    'parent_item'       => __( 'Parent Post Category' ),
		    'parent_item_colon' => __( 'Parent Post Category:' ),
		    'edit_item'         => __( 'Edit Post Category' ), 
		    'update_item'       => __( 'Update Post Category' ),
		    'add_new_item'      => __( 'Add New Post Category' ),
		    'new_item_name'     => __( 'New Post Category' ),
		    'menu_name'         => __( 'Post Categories' ),
		  );
		  $args = array(
		    'labels' 			=> $labels,
		    'hierarchical' 		=> true,
		    'show_ui'           => true,
	    	'show_admin_column' => true,
		    'rewrite' 			=> array(
			 	'slug'				=> 'custom_category',//-------> create slug
			  	'with_front' 		=> true,
			  	'hierarchical'		=> true ,
			),
		  );
		  register_taxonomy( 'custom_category', 'post_type_slug', $args );  //-------> change to the slug
		}
		add_action( 'init', 'my_taxonomies_custom', 0 );


// ==== SINGLE PAGE META ====//
add_action('admin_init','page_meta_init');

function page_meta_init()
{
	$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;

	// checks for post/page ID and adds the box
	if ($post_id == '40')
	{
		add_meta_box(
			'home_meta', 
			'Home Title', 
			'page_meta_setup', 
			'page', 
			'normal', 
			'high'
		);
	}

	//Meta Box for the specific page
		function page_meta_setup( $post ) {
	    wp_nonce_field( basename( __FILE__ ), 'prfx_nonce' );
	    $prfx_stored_meta = get_post_meta( $post->ID );
	    ?>
		 
		 	<!-- Here is a text box -->
		    <p>
		        <label for="meta-text" class="prfx-row-title"><?php _e( 'Example Text Input', 'prfx-textdomain' )?></label>
		        <input type="text" name="meta-text" id="meta-text" value="<?php if ( isset ( $prfx_stored_meta['meta-text'] ) ) echo $prfx_stored_meta['meta-text'][0]; ?>" />
		    </p>
		
			<!-- Here is a text area-->
			<p>
			    <label for="meta-textarea" class="prfx-row-title"><?php _e( 'Example Textarea Input', 'prfx-textdomain' )?></label>
			    <textarea name="meta-textarea" id="meta-textarea"><?php if ( isset ( $prfx_stored_meta['meta-textarea'] ) ) echo $prfx_stored_meta['meta-textarea'][0]; ?></textarea>
			</p>

		 
		    <?php
		}

	//Save the meta for the specific page
		function page_meta_save( $post_id ) {
	 
		    // Checks save status
		    $is_autosave = wp_is_post_autosave( $post_id );
		    $is_revision = wp_is_post_revision( $post_id );
		    $is_valid_nonce = ( isset( $_POST[ 'prfx_nonce' ] ) && wp_verify_nonce( $_POST[ 'prfx_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';
		 
		    // Exits script depending on save status
		    if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
		        return;
		    }
		 
		 	//Text Box Save
			    // Checks for input and sanitizes/saves if needed
			    if( isset( $_POST[ 'meta-text' ] ) ) {
			        update_post_meta( $post_id, 'meta-text', sanitize_text_field( $_POST[ 'meta-text' ] ) );
			    }
		 
		 	//Text Area Save
			 	// Checks for input and saves if needed
				if( isset( $_POST[ 'meta-textarea' ] ) ) {
				    update_post_meta( $post_id, 'meta-textarea', $_POST[ 'meta-textarea' ] );
				}
		}
		
	add_action( 'save_post', 'page_meta_save' );

	$template_file = get_post_meta($post_id,'_wp_page_template',TRUE);

 // check for a template type
	//if ($template_file == 'home.php')
	//{
		//add_meta_box('my_meta_2', 'My Custom Meta Box 2', 'my_meta_setup_2', 'page', 'normal', 'high');
	//}

 // add a meta box for custom page types
	//foreach (array('events','page') as $type) 
	//{
		//add_meta_box('my_meta_3', 'My Custom Meta Box 3', 'my_meta_setup_3', $type, 'normal', 'high');
	//}


}
