'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');

/**
 * Configuration
 */

 // Source folder configuration
const SRC_DIR = {};
SRC_DIR.root = './src/';
SRC_DIR.assets = SRC_DIR.root + 'assets/';
SRC_DIR.img = SRC_DIR.root + 'images/';
SRC_DIR.js = SRC_DIR.root + 'js/';
SRC_DIR.less = SRC_DIR.root + 'less/';
SRC_DIR.pug = SRC_DIR.root + 'pug/';

// Source file matchers, using respective directories
const SRC_FILES = {
	less: SRC_DIR.less + '*.less',
	pugLayouts: SRC_DIR.pug + 'layouts/*.pug',
	pug: SRC_DIR.pug + '*.pug',
	js: SRC_DIR.js + '**/*.js',
	images: SRC_DIR.img + '**/*',
	assets: SRC_DIR.assets + '**/*'
};

// Output directories
const DIST_DIR = {};
DIST_DIR.root = './dist/';
DIST_DIR.js = DIST_DIR.root + 'js/';
DIST_DIR.css = DIST_DIR.root + 'css/';
DIST_DIR.cssFiles = DIST_DIR.root + 'css/style.css';
DIST_DIR.fnt = DIST_DIR.root + 'fonts/';
DIST_DIR.img = DIST_DIR.root + 'img/';

/**
 * Tasks
 */

gulp.task('watch', () => {
	gulp.watch(SRC_FILES.less, ['less']);
	gulp.watch([SRC_FILES.pug,  SRC_FILES.pugLayouts], ['pug']);
	gulp.watch(SRC_FILES.images, ['imagemin']);
	gulp.watch(SRC_FILES.assets.onlyCopy, ['copyAssets']);
});

gulp.task('js', () =>
  gulp.src(SRC_FILES.js)
  .pipe(gulp.dest(DIST_DIR.js))
  .pipe(connect.reload())
);

gulp.task('less', () =>
  gulp.src(SRC_FILES.less)
    .pipe(less().on('error', err => console.log(err)))
    .pipe(gulp.dest(DIST_DIR.css))
    .pipe(connect.reload())
);

gulp.task('pug', () =>
  gulp.src(SRC_FILES.pug)
    .pipe(pug({
      pretty: true // Comment this to get minified HTML
    }))
    .pipe(gulp.dest(file => {
      var pugIndex = file.base.lastIndexOf('pug');
      var relPath = file.base.substr(pugIndex+4);
      return DIST_DIR.root + relPath;
    }))
    .pipe(connect.reload())
);

gulp.task('imagemin', () =>
  gulp.src(SRC_FILES.images)
  .pipe(imagemin())
  .pipe(gulp.dest(DIST_DIR.img))
  .pipe(connect.reload())
);

gulp.task('copyAssets', () =>
  gulp.src(SRC_FILES.assets)
  .pipe(gulp.dest(DIST_DIR.root))
  .pipe(connect.reload())
);

gulp.task('webserver', () =>
  connect.server({
    root: 'dist',
    livereload: true,
    host: 'localhost'
  })
);

gulp.task('default', ['less', 'pug', 'imagemin', 'js', 'copyAssets']);
gulp.task('server', ['default', 'webserver', 'watch']);
