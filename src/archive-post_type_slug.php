<?php get_header(); ?>

  <div id="wrap-content" class="wrap-content">
    <div id="content" class="site-content">
      <section id="primary" class="content-area">
        <main id="main" class="site-main" role="main">

			<!-- Get the category terms and make a list to filter them -->
        	<?php
			    $terms = get_terms("custom_category"); //Change this to custom category from the functions-config.php
			    $count = count($terms);
			    echo '<div id="category-filter">';
			    echo '<button data-filter="*">All</button>';
			        if ( $count > 0 )
			        {   
			            foreach ( $terms as $term ) {
			                $termname = strtolower($term->name);
			                $termname = str_replace(' ', '-', $termname);
			                echo '<button data-filter=".'.$termname.'" title="" rel="'.$termname.'">'.$term->name.'</button>';
			            }
			        }
			    echo "</div>";
			?>
        
        	<!-- Get the custom post type -->
        	<?php 
			    $loop = new WP_Query(array('post_type' => 'post_type_slug', 'posts_per_page' => -1));  //Change this to custom post slug from the functions-config.php
			    $count =0;
			?>
			             
			<div id="customPost-wrapper">
			    <ul id="customPost-list">
			             
			        <?php if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post(); ?>
			                     
			                <?php
			                $terms = get_the_terms( $post->ID, 'custom_category' );  //Change this to custom category from the functions-config.php
			                                     
			                if ( $terms && ! is_wp_error( $terms ) ) : 
			                    $links = array();
			 
			                    foreach ( $terms as $term ) 
			                    {
			                        $links[] = $term->name;
			                    }
			                    $links = str_replace(' ', '-', $links); 
			                    $tax = join( " ", $links );     
			                else :  
			                    $tax = '';  
			                endif;
			                ?>
			                             
			                             
			                <li class="customPost-item <?php echo strtolower($tax); ?> all">
			                    <div class="thumb"><a href="<?php the_permalink() ?>"><?php the_post_thumbnail( array(400, 160) ); ?></a></div>
			                    <h3><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h3>
			                    <p class="excerpt"><a href="<?php the_permalink() ?>"><?php echo get_the_excerpt(); ?></a></p>
			                </li>
			                         
			            <?php endwhile; else: ?>
			                      
			                <li class="error-not-found">Sorry, no portfolio entries found.</li>
			                         
			        <?php endif; ?>
			 
			    </ul>
			 
			    <div class="clearboth">
			</div>


        </main>
        <?php voidx_post_navigation(); ?>
      </section>
    </div>
  </div>


<?php get_sidebar(); ?>
<?php get_footer(); ?>
