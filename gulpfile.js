const themename = 'dev_portfolio';
const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	uglify = require('gulp-uglify'),
	lineec = require('gulp-line-ending-corrector');

const root = `./${themename}/`,
	scss = `${root}sass/`,
	js = `${root}js/custom/`;

const phpWatchFiles = `${root}**/*.php`,
	stylesWatchFiles = `${scss}**/*.scss`;

function css() {
	return gulp
		.src([scss + 'style.scss'])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(
			sass({
				outputStyle: 'expanded',
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 10 versions'))
		.pipe(sourcemaps.write())
		.pipe(lineec())
		.pipe(gulp.dest(root));
}

function concatCSS() {
	return gulp
		.src([root + 'style.css'])
		.pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
		.pipe(concat('style.min.css'))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('./maps/'))
		.pipe(lineec())
		.pipe(gulp.dest(scss));
}

const jsSRC = `${js}*`,
	jsDest = `${root}/js/`;

function javascript() {
	return gulp
		.src(jsSRC)
		.pipe(concat('scripts-bundled.js'))
		.pipe(uglify())
		.pipe(lineec())
		.pipe(gulp.dest(jsDest));
}
const imageSRC = `${root}images/*`,
	imageDest = `${root}dist/images`;

function imgmin() {
	return gulp
		.src(imageSRC)
		.pipe(changed(imageDest))
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
			]).pipe(gulp.dest(imageDest))
		);
}

function watch() {
	browserSync.init({
		open: 'external',
		proxy: 'http://localhost:32833/',
		port: 8080,
	});

	gulp.watch(stylesWatchFiles, gulp.series([css, concatCSS]));
	gulp.watch(jsSRC, javascript);
	gulp.watch(imageSRC, imgmin);
	gulp.watch([phpWatchFiles, jsDest + 'scripts-bundled.js', scss + 'style.min.css', root + 'style.css']).on(
		'change',
		reload
	);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;
exports.imgmin = imgmin;

const build = gulp.parallel(watch);

gulp.task('default', build);
