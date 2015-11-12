var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

var paths = {
  es6_files: [
    'ui/es6/willow-main.js'
  ],
  js_files: [
    'ui/js/willow-main.js'
  ],
  js_folder: 'ui/js/',
  build_js_files: 'build/js/willow-main.js',
  vendor_js_files: [
    'node_modules/material-design-lite/material.min.js'
  ],
  build_vendor_js_file: 'vendor.js',
  build_vendor_js_files: 'build/js/vendor.js',
  build_js_folder: 'build/js/',

  sass_files: 'ui/sass/**/*.sass',
  css_files: 'ui/css/**/*.css',
  css_folder: 'ui/css/',
  build_css_file: 'willowStyle.css',
  build_css_files: 'build/css/willowStyle.css',
  build_css_folder: 'build/css/',
  vendor_css_files: [
    'node_modules/material-design-lite/material.min.css'
  ],
  build_vendor_css_file: 'vendor.css',
  build_vendor_css_files: 'build/css/vendor.css',

  font_files: 'ui/fonts/**/*',
  build_font_folder: 'build/fonts/',

  image_files: 'ui/img/**/*',
  build_image_folder: 'build/img/',

  jade_index_file: 'ui/index.jade',
  index_file: 'ui/index.html',
  index_folder: 'ui/',
  build_index_folder: 'build/',

  test_files: 'tests/**/*.spec.js',
  test_config_file: 'tests/karma.conf.js',
  test_reports: 'tests/coverage/PhantomJS 1.9.8 (Mac OS X)/index.html'
};

var onError = function(err) {
  $.notify(err);
  this.emit('end');
};

/*
 * Dev environment tasks
 */

gulp.task('default', ['serve']);

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    startPath: "/ui/"
  });

  gulp.watch(paths.es6_files, ['babel']);
  gulp.watch(paths.js_files).on('change', browserSync.reload);
  gulp.watch(paths.jade_index_file, ['jade']);
  gulp.watch(paths.index_file).on('change', browserSync.reload);
  gulp.watch(paths.sass_files, ['sass']);
  gulp.watch(paths.css_files).on('change', browserSync.reload);
});

/*
 * Preprocessor tasks
 */

gulp.task('babel', function() {
  return gulp.src(paths.es6_files)
    .pipe($.babel())
    .pipe(gulp.dest(paths.js_folder));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass_files)
    .pipe($.plumber({
      errorPlumber: onError
    }))
    .pipe($.sass({
      arrLogToConsole: true,
      sourceComments: 'normal'
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.css_folder));
});

gulp.task('jade', function() {
   return gulp.src(paths.jade_index_file)
     .pipe($.plumber({
       errorPlumber: onError
     }))
     .pipe($.jade({
       pretty: true
     }))
     .pipe($.plumber.stop())
     .pipe(gulp.dest(paths.index_folder));
});

/*
 * Test tasks
 */

gulp.task('test', function() {
  //TODO
});

/*
 * build tasks
 */

gulp.task('vendor:js', function() {
  return gulp.src(paths.vendor_js_files)
    .pipe($.plumber({
      errorPlumber: onError
    }))
    .pipe($.concat(paths.build_vendor_js_file))
    .pipe($.uglify())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.build_js_folder));
});

gulp.task('js', ['vendor:js'], function() {
  return gulp.src(paths.js_files)
    .pipe($.plumber({
      errorPlumber: onError
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter($.jshintStylish))
    .pipe($.uglify())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.build_js_folder));

});

gulp.task('index', function() {
  return gulp.src(paths.index_file)
    .pipe($.plumber({
      errorPlumber: onError
    }))
    .pipe($.inject(gulp.src([paths.build_vendor_css_files, paths.build_vendor_js_files], {read: false}), {
      name: 'vendor',
      addRootSlash: false,
      ignorePath: paths.build_index_folder
    }))
    .pipe($.inject(gulp.src([paths.build_js_files, paths.build_css_files], {read: false}), {
      name: 'inject',
      addRootSlash: false,
      ignorePath: paths.build_index_folder
    }))
    .pipe($.removeHtmlComments())
    .pipe($.removeEmptyLines())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.build_index_folder));
});

gulp.task('css:vendor', function() {
  return gulp.src(paths.vendor_css_files)
    .pipe($.plumber({
      errorPlumber: onError
    }))
    .pipe($.concat(paths.build_vendor_css_file))
    .pipe($.plumber.stop())
    .pipe($.stripCssComments({
      all: true
    }))
    .pipe($.removeEmptyLines())
    .pipe(gulp.dest(paths.build_css_folder));
});

gulp.task('css', ['css:vendor'], function() {
  return gulp.src(paths.css_files)
    .pipe($.plumber({
      errorPlumber: onError
    }))
    .pipe($.concat(paths.build_css_file))
    .pipe($.csso())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.build_css_folder));
});

gulp.task('fonts', function() {
  return gulp.src(paths.font_files)
    .pipe(gulp.dest(paths.build_font_folder));
});

gulp.task('images', function() {
  return gulp.src(paths.image_files)
    .pipe(gulp.dest(paths.build_image_folder));
});

gulp.task('clean', function() {
  return del(paths.build_index_folder);
});

gulp.task('build', function(callback) {
  return runSequence(
    ['jade', 'sass'],
    'clean',
    ['js', 'css'],
    'index',
    'fonts',
    'images',
    callback
  );
});
