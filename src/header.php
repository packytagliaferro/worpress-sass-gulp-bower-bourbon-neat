<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Description -->
<meta name="description" content="">

<!-- Twitter Card data -->
<meta name="twitter:card" content="app">

<!-- Open Graph data -->
<meta property="og:title" content="Title Here" />
<meta property="og:type" content="article" />
<meta property="og:url" content="http://www.example.com/" />
<meta property="og:image" content="http://example.com/image.jpg" />
<meta property="og:description" content="Description Here" />

<!-- Title -->
<title><?php wp_title( ' | ', true, 'right' ); ?>  <?php bloginfo('name') ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>

<!-- Help out the JS find stuff -->
<script>
var YOURSITENAME = {
    "templateURI":'<?= get_template_directory_uri(); ?>',
};
</script>

</head>
<body <?php body_class(); ?>>
  <div id="page" class="page">
    <div id="wrap-header" class="wrap-header">
      <header id="masthead" class="site-header">
        <div class="site-branding">
            <!-- Logo Menu -->
            <?php if ( get_theme_mod( 'wpt_logo' ) ) : ?>
              <div class='site-logo'>
                 <a href='<?php echo esc_url( home_url( '/' ) ); ?>' title='<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>' rel='home'><img  src='<?php echo esc_url( get_theme_mod( 'wpt_logo' ) ); ?>' alt='<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>'></a>
              </div>
            <?php else : ?>
               <a class="navbar-brand" href="<?php bloginfo( 'url' ); ?>"><?php bloginfo( 'name' ); ?></a>
            <?php endif; ?>
          <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
          <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
        </div>
        <nav id="site-navigation" class="site-navigation" >
          <button id="responsive-menu-toggle" style="float:right;"><?php _e( 'Menu', 'voidx' ); ?></button>
          <div id="responsive-menu" class="menu mobile-menu">
            <?php wp_nav_menu( array( 
                'theme_location' => 'header', 
                'menu_id' => 'menu-header', 
                'menu_class' => 'menu-inline' 
            ) ); ?>
          </div>
        </nav>
      </header>
    </div>
    <div id="wrap-main" class="wrap-main">
