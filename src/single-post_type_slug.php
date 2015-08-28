<?php get_header(); ?>

  <div id="wrap-content" class="wrap-content">
    <div id="content" class="site-content">
      <section id="primary" class="content-area">
        <main id="main" class="site-main">
        
        	<?php if(have_posts()): while(have_posts()): the_post(); ?>

			<h1><?php the_title(); ?></h1>

			<p><?php the_content(); ?></p>

			
			
			<?php
				// Store meta data in some variables 
			    $meta_text = get_post_meta( get_the_ID(), 'meta-text', true );
			    $meta_checkbox = get_post_meta( get_the_ID(), 'meta-checkbox', true );
			    $meta_checkbox_two = get_post_meta( get_the_ID(), 'meta-checkbox-two', true );
			    $meta_radio = get_post_meta( get_the_ID(), 'meta-radio', true ); 
			    $meta_select = get_post_meta( get_the_ID(), 'meta-select', true ); 
			    $meta_textarea = get_post_meta( get_the_ID(), 'meta-textarea', true ); 
			    $meta_pdf  = get_post_meta(get_the_ID(), 'wp_custom_attachment', true);
			?>

			<p>
				<?php 
					//Text box content
				    if( !empty( $meta_text ) ) {
				        echo $meta_text;
				    } ?>
			</p>

			<p>
				<?php 
					//check box content
				    if( !empty( $meta_checkbox ) ) {
				        echo $meta_checkbox;
				    } 

				    if( !empty( $meta_checkbox_two ) ) {
				        echo $meta_checkbox_two;
				    } ?>
			</p>
	
			<p>
				<?php 
					//Text box content
				    if( !empty( $meta_radio ) ) {
				        echo $meta_radio;
				    } ?>
			</p>

			<p>
				<?php 
					//Select box content
				    if( !empty( $meta_select ) ) {
				        echo $meta_select;
				    } ?>
			</p>

			<p>
				<?php 
					//Text area content
				    if( !empty( $meta_textarea ) ) {
				        echo $meta_textarea;
				    } ?>
			</p>

			<!-- pdf link -->
			<a href="<?php echo $meta_pdf['url']; ?>"  target='_blank'>Download PDF Here</a>




			<?php endwhile; endif; ?>

        </main>
        <?php voidx_post_navigation(); ?>
      </section>
    </div>
  </div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
