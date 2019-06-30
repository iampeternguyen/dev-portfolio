<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @see https://developer.wordpress.org/themes/basics/template-hierarchy/
 */
get_header();
get_template_part('template-parts/frontpage', 'splash');

?>

<div id="primary" class="content-area">
  <main id="main" class="site-main">
    <?php get_template_part('template-parts/frontpage', 'tooltipButton'); ?>
    <?php get_template_part('template-parts/frontpage', 'intro'); ?>
    <?php get_template_part('template-parts/frontpage', 'gallery'); ?>
    <?php get_template_part('template-parts/frontpage', 'contact'); ?>



  </main><!-- #main -->
</div><!-- #primary -->

<?php get_template_part('template-parts/modal', 'code'); ?>
<?php
get_footer();