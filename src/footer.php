      </div>
      <div id="wrap-footer" class="wrap-footer">
        <footer id="colophon" class="site-footer" role="contentinfo">
          <nav id="site-footer-navigation" role="navigation">
            <?php wp_nav_menu( array( 'theme_location' => 'footer', 'menu_id' => 'menu-footer', 'menu_class' => 'menu-inline' ) ); ?>
          </nav>
        </footer>
      </div>
    </div>

    <div id="modal" class="modal">
        <button type="button" class="close" onclick="Custombox.close();">
            <span>×</span><span class="sr-only">Close</span>
        </button>
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="title">Modal title</h4>
          </div>
          <div class="modal-body">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
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