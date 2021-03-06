<?php
/**
 * Dev Portfolio functions and definitions.
 *
 * @see https://developer.wordpress.org/themes/basics/theme-functions/
 */
if (!function_exists('dev_portfolio_setup')) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function dev_portfolio_setup()
    {
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on Dev Portfolio, use a find and replace
         * to change 'dev_portfolio' to the name of your theme in all the template files.
         */
        load_theme_textdomain('dev_portfolio', get_template_directory().'/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(array(
            'menu-1' => esc_html__('Primary', 'dev_portfolio'),
        ));

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));

        // Set up the WordPress core custom background feature.
        add_theme_support('custom-background', apply_filters('dev_portfolio_custom_background_args', array(
            'default-color' => 'ffffff',
            'default-image' => '',
        )));

        // Add theme support for selective refresh for widgets.
        add_theme_support('customize-selective-refresh-widgets');

        /*
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support('custom-logo', array(
            'height' => 250,
            'width' => 250,
            'flex-width' => true,
            'flex-height' => true,
        ));
    }
endif;
add_action('after_setup_theme', 'dev_portfolio_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function dev_portfolio_content_width()
{
    // This variable is intended to be overruled from themes.
    // Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
    $GLOBALS['content_width'] = apply_filters('dev_portfolio_content_width', 640);
}
add_action('after_setup_theme', 'dev_portfolio_content_width', 0);

/**
 * Register widget area.
 *
 * @see https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function dev_portfolio_widgets_init()
{
    register_sidebar(array(
        'name' => esc_html__('Sidebar', 'dev_portfolio'),
        'id' => 'sidebar-1',
        'description' => esc_html__('Add widgets here.', 'dev_portfolio'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
}
add_action('widgets_init', 'dev_portfolio_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function dev_portfolio_scripts()
{
    wp_enqueue_script('dev_portfolio-navigation', get_template_directory_uri().'/js/navigation.js', array(), '20151215', true);
    wp_enqueue_script('dev_portfolio-skip-link-focus-fix', get_template_directory_uri().'/js/skip-link-focus-fix.js', array(), '20151215', true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    wp_enqueue_style('dev_portfolio-style', get_theme_file_uri('/css/style.min.css'), null, 1.0);
    wp_enqueue_style('raleway_font', '//fonts.googleapis.com/css?family=Raleway:300,400,700&display=swap');
    wp_enqueue_style('roboto_font', '//fonts.googleapis.com/css?family=Roboto+Slab:300,400,700&display=swap');
    wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js');
    wp_enqueue_script('postscribe', 'https://cdnjs.cloudflare.com/ajax/libs/postscribe/2.0.8/postscribe.min.js');
    wp_enqueue_script('vuejs', 'https://cdn.jsdelivr.net/npm/vue');

    wp_enqueue_script('dev_portfolio-js', get_theme_file_uri('/js/scripts-bundled.js'), null, 1.0, true);
}
add_action('wp_enqueue_scripts', 'dev_portfolio_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory().'/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory().'/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory().'/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory().'/inc/customizer.php';

/*
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory().'/inc/jetpack.php';
}

// Custom Post types
// This should be placed in MU plugins so it persists when themes are switched
// But since this is my personal project I won't be switching themese anytime soon
// It makes it easier to include in my github repo

function custom_post_types()
{
    register_post_type('code_explainer', array(
        'labels' => array(
            'name' => 'Code Explainers',
            'add_new_item' => 'Add New Code Explainer',
            'edit_item' => 'Edit Code Explainer',
            'all_items' => 'All Code Explainers',
            'singular_name' => 'Code Explainer',
        ),
        'public' => true,
        'menu_icon' => 'dashicons-media-code',
        'has_archive' => 'true',
        'rewrite' => array('slug' => 'code_explainers'),
        'supports' => array('title', 'editor', 'excerpt'),
        'show_in_rest' => true,
        ));

    register_post_type('project', array(
            'labels' => array(
                'name' => 'Projects',
                'add_new_item' => 'Add New Project',
                'edit_item' => 'Edit Project',
                'all_items' => 'All Projects',
                'singular_name' => 'Project',
            ),
            'public' => true,
            'menu_icon' => 'dashicons-tablet',
            'has_archive' => 'true',
            'rewrite' => array('slug' => 'projects'),
            'supports' => array('title', 'editor', 'thumbnail'),
            'show_in_rest' => true,
            ));
}

add_action('init', 'custom_post_types');

function custom_rest_fields()
{
    register_rest_field('code_explainer', 'html_gist', array(
        'get_callback' => function () {
            return get_field('html_gist');
        },
    ));
    register_rest_field('code_explainer', 'css_gist', array(
        'get_callback' => function () {
            return get_field('css_gist');
        },
    ));

    register_rest_field('code_explainer', 'js_gist', array(
        'get_callback' => function () {
            return get_field('js_gist');
        },
    ));

    register_rest_field('code_explainer', 'php_gist', array(
        'get_callback' => function () {
            return get_field('php_gist');
        },
    ));

    register_rest_field('project', 'summary', array(
        'get_callback' => function () {
            return get_field('summary');
        },
    ));

    register_rest_field('project', 'highlights', array(
        'get_callback' => function () {
            return get_field('highlights');
        },
    ));

    register_rest_field('project', 'demo_link', array(
        'get_callback' => function () {
            return get_field('demo_link');
        },
    ));

    register_rest_field('project', 'github_link', array(
        'get_callback' => function () {
            return get_field('github_link');
        },
    ));

    register_rest_field('project', 'featured_image', array(
        'get_callback' => function () {
            return get_the_post_thumbnail_url();
        },
    ));
}

add_action('rest_api_init', 'custom_rest_fields');