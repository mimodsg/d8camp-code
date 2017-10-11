/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');

//=======================================================
// Include Our Plugins
//=======================================================
var concat = require('gulp-concat');
var order = require('gulp-order');

// Export our tasks.
module.exports = {

  // Concat all JS
  js: function () {
    return gulp.src([
      './source/js/behaviors/*.js',
      './source/_patterns/**/*.js'
    ])
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('../dist/js'))
      .pipe(gulp.dest('./source/js'))
  },

  // Concat all CSS into a master bundle.
  css: function () {
    return gulp.src([
      './src/components/**/*.css'
    ])
    // Reorder the files so global and btn are first.
      .pipe(order([
        'src/components/**/*.css',
      ], {base: './'}))
      .pipe(concat('style.css'))
      .pipe(cssnano({
        autoprefixer: false,
        colormin: false
      }))
      .pipe(gulp.dest('./dist/all'))
      .pipe(sync.stream());
  }
};
