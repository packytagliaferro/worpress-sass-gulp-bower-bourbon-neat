      </div>
      <div id="wrap-footer" class="wrap-footer">
        <footer id="colophon" class="site-footer" role="contentinfo">
          <nav id="site-footer-navigation" role="navigation">
            <?php wp_nav_menu( array( 'theme_location' => 'footer', 'menu_id' => 'menu-footer', 'menu_class' => 'menu-inline' ) ); ?>
          </nav>
        </footer>
      </div>
    </div>


    <div id="modal-image" class="modal">

        <div class="modal-content">
          <div class="modal-header">
          </div>
          <div class="modal-body"></div>
        </div>
    </div>

    <script>
       jQuery(function($){ 
            $('#modal-trigger').on('click', function ( e ) {
                Custombox.open({
                    target: '#modal',
                    effect: 'blur'
                });
                e.preventDefault();
            });
        });
    </script>
  <?php wp_footer(); ?>
  </body>
</html>