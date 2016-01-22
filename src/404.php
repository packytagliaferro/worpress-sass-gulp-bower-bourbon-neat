<?php get_header(); ?>
  <div id="wrap-content" class="wrap-content">
    <div id="content" class="site-content">
      <section id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
            <article id="missing" role="article">
              <header class="entry-header">
                <h1>Ooops, cant find that page!</h1>
              </header>
              <div id="missing-content">
                <p>This is embarrassing, we can not find that page.</p>
                <a href="<?php echo site_url( ); ?>/"><h3>Go Home</h3></a>

              </div>
            </article>

        </main>

      </section>
    </div>
  </div>
<?php get_footer(); ?>