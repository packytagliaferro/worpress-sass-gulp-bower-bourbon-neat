 <?php get_header(); ?>

  <div id="wrap-content" class="wrap-content">
    <div id="content" class="site-content">
      <section id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
            
                <?php 
                    $catID = get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) );
                    $args = array(
                        'numberposts' => 5, 
                        'tax_query' => array(
                                        array(
                                            'taxonomy'          => 'custom_category', //custom category name from functions-config.php
                                            'field'             => 'term_id',
                                            'terms'             => $catID,
                                            'include_children'  => false
                                        ),
                                    ),
                        'post_type' => 'post_type_slug' //custom post type name from functions-config.php      
                    );

                    $catPosts = get_posts( $args );


                    echo '<ul>';
                    foreach( $catPosts as $singlePost ) {

                        $meta_text = get_post_meta( $singlePost->ID, 'meta-text', true ); //this will get meta

                        echo $meta_text;

                        echo '<li>';
                        echo '<a href="'.get_bloginfo('url').'/index.php?p='.$singlePost->ID.'">'.$singlePost->post_title.'</a>';
                        echo '<div>'.get_the_post_thumbnail( $singlePost->ID ). '</div>';
                        echo '</li>';
                    };
                    echo '</ul>';

                    echo '<form method="POST">';
                    echo '<select name="goToPost" onchange="document.location=this.value">';
                    echo '<option value="">'.__('Relevent Posts', 'your_text_domain').'</option>';  
                    foreach( $catPosts as $singlePost ) {
                    echo '<option value="'.get_bloginfo('url').'/index.php?p='.$singlePost->ID.'">'.$singlePost->post_title.'</option>';
                    };
                    echo '</select>';
                    echo '</form>';
                ?> 

        </main>
        <?php voidx_post_navigation(); ?>
      </section>
    </div>
  </div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
