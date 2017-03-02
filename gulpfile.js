var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rucksack = require('rucksack-css');
var cssnext = require('postcss-cssnext');
var cssnested = require('postcss-nested');
var mixins = require('postcss-mixins');
var lost = require('lost');
var atImport = require('postcss-import');
var csswring = require('csswring');
var mqpacker = require('css-mqpacker');
var browserSync = require('browser-sync').create();

// server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
});

// html
gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

// fonts
gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

// images
gulp.task('images', function() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images/'));
});

// css processing
gulp.task('css', function() {
  var processors = [
    atImport(),
    mixins(),
    cssnested,
    lost(),
    rucksack(),
    cssnext({ browsers: ['> 5%', 'ie 8'] }),
    mqpacker(),
    csswring()
  ];

  return gulp.src('./src/styles/invie.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(browserSync.stream());
});

// watchers
gulp.task('watch', function() {
  gulp.watch('./src/styles/*.css', ['css']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

// chain tasks
gulp.task('default', ['html', 'fonts', 'images', 'css', 'watch', 'serve']);
