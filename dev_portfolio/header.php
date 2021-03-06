<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @see https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="https://gmpg.org/xfn/11">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <div id="page" class="site">
    <?php if (!is_front_page()) : ?>

    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e('Skip to content', 'dev_portfolio'); ?></a>
    <?php endif; ?>
    <header id="masthead" class="site-header">
      <?php if (!is_front_page()) : ?>
      <div class="site-branding">
        <?php
            the_custom_logo();
            if (is_front_page() && is_home()) :
                ?>
        <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a>
        </h1>
        <?php
            else :
                ?>
        <p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a>
        </p>
        <?php
            endif;
            $dev_portfolio_description = get_bloginfo('description', 'display');
            if ($dev_portfolio_description || is_customize_preview()) :
                ?>
        <p class="site-description"><?php echo $dev_portfolio_description; /* WPCS: xss ok. */ ?></p>
        <?php endif; ?>
      </div><!-- .site-branding -->

      <nav id="site-navigation" class="main-navigation">
        <button class="menu-toggle" aria-controls="primary-menu"
          aria-expanded="false"><?php esc_html_e('Primary Menu', 'dev_portfolio'); ?></button>
        <?php
            wp_nav_menu(array(
                'theme_location' => 'menu-1',
                'menu_id' => 'primary-menu',
            ));
            ?>
      </nav><!-- #site-navigation -->

      <?php endif; ?>
    </header><!-- #masthead -->

    <div id="content" class="site-content">