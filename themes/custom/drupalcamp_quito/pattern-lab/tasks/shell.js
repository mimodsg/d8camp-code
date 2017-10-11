'use strict';

//=======================================================
// Include Our Plugins
//=======================================================
var gulp = require('gulp');
var shell = require('gulp-shell');

// Export tasks
module.exports = {

  // Pattern lab generate
  generate: function () {
    return gulp.src('', {read: false})
      .pipe(shell([
        'php core/console --generate'
      ]));
  },

  // Pattern lab watch
  watch: function () {
    return gulp.src('', {read: false})
      .pipe(shell([
        'php core/console --watch'
      ]));
  },

  // Clear Drupal cache using console
  cache: function () {
    return gulp.src('', {read: false})
      .pipe(shell([
        'drupal cr all'
      ]));
  }
};
