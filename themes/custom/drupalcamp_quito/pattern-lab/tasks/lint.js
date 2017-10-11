/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');

//=======================================================
// Include Our Plugins
//=======================================================
var sassLint = require('gulp-sass-lint');
var eslint   = require('gulp-eslint');

// Export our tasks.
module.exports = {
  // Lint Sass based on .sass-lint.yml config.
  sass: function() {
    return gulp.src([
      './source/scss/style.scss'
    ])
      .pipe(sassLint())
      .pipe(sassLint.format());
  },

  // Lint JavaScript based on .eslintrc config.
  js: function() {
    return gulp.src([
      './source/js/behaviors/js',
      './source/_patterns/**/*.js'
    ])
      .pipe(eslint())
      .pipe(eslint.format());
  }
};