'use strict'
//duh
const gulp = require('gulp');
//minimizes script files
const uglify = require('gulp-uglify');
//for style organization, partials, etc.
const sass = require('gulp-sass');
//minimizes css files for final app
const cssnano = require('gulp-cssnano');
//auto prefixes css for things like flexbox that not all browsers support
const autoprefixer = require('gulp-autoprefixer');
//keeping you live as changes are saved
const browserSync = require('browser-sync').create();

const pump = require('pump');

//runs all sass and css related functions, refreshes browser
gulp.task('css', function() {
  return gulp.src('dev/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dev/css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));

})

//pumps final html files into app
gulp.task('html', function() {
  gulp.src('/dev/*.html')
    .pipe(gulp.dest('/app'))
})

//minimized js files, refreshes browser
gulp.task('minify', function() {
  gulp.src('/dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('/app/js'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
})

//sets up browser sync on dev
gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "dev"
    }
  });
});

//sets reload ability
gulp.task('reload', function() {
  browserSync.reload();
});


//default gulp, sets up server---runs on saves and updates broswer.  so hot!
gulp.task('default', ['css', 'minify', 'browser-sync'], function() {
  gulp.watch("dev/scss/**/*.scss", ['css']);
  gulp.watch("dev/js/*.js", ['minify']);
  gulp.watch("dev/*.html", ['reload']);
});