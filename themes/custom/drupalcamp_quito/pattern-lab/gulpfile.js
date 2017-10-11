/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');

//=======================================================
// Include Our Plugins
//=======================================================
var sync = require('browser-sync');
var runSequence = require('run-sequence');

//=======================================================
// Include Our tasks.
//
// Each task is broken apart to it's own node module.
// Check out the ./tasks directory for more.
//=======================================================
var taskCompile = require('./tasks/compile.js');
var taskShell = require('./tasks/shell.js');
var taskLint = require('./tasks/lint.js');
var taskCompress = require('./tasks/compress.js');
var taskClean = require('./tasks/clean.js');
var taskConcat = require('./tasks/concat.js');

//=======================================================
// Shell scripts execution.
//=======================================================

// Generate
gulp.task('shell:generate', function () {
  return taskShell.generate();
});

// Watch
gulp.task('shell:watch', function () {
  return taskShell.watch();
});

// Clear cache
gulp.task('shell:cache', function () {
  return taskShell.cache();
});

//=======================================================
// Clean all directories.
//=======================================================
gulp.task('clean', ['clean:css', 'clean:js']);

// Clean CSS files.
gulp.task('clean:css', function () {
  return taskClean.css();
});

// Clean JS files.
gulp.task('clean:js', function () {
  return taskClean.js();
});

//=======================================================
// Concat all CSS files into a master bundle.
//=======================================================
gulp.task('concat', function () {
  return taskConcat.js();
});

//=======================================================
// Compress Files
//=======================================================
gulp.task('compress', function () {
  return taskCompress.assets();
});

//=======================================================
// Lint Sass and JavaScript
//=======================================================
gulp.task('lint', ['lint:sass', 'lint:js']);

// Lint Sass based on .sass-lint.yml config.
gulp.task('lint:sass', function () {
  return taskLint.sass();
});

// Lint JavaScript based on .eslintrc config.
gulp.task('lint:js', function () {
  return taskLint.js();
});

//=======================================================
// Compile Our Sass and JS
// We also move some files if they don't need
// to be compiled.
//=======================================================
gulp.task('compile', function (callback) {
  runSequence(
    'clean',
    ['lint', 'compile:styles', 'compress'],
    'concat',
    'shell:generate',
    'shell:cache',
    callback
  );
});


// Compile pattern lab
gulp.task('compile:styles', function () {
  return taskCompile.styles();
});

//=======================================================
// Watch and recompile sass.
//=======================================================
gulp.task('watch', function () {

  // BrowserSync proxy setup
  // Uncomment this and swap proxy with your local env url.
  // NOTE: for this to work in Drupal, you must install and enable
  // https://www.drupal.org/project/link_css. This module should
  // NOT be committed to the repo OR enabled on production.
  //
  // This should work out of the box for work within the style guide.
  //
  // sync.init({
  //   open: false,
  //   proxy: 'http://presentacion-code.dev/'
  // });


  // Watch all my sass files and compile sass if a file changes.
  gulp.watch(
    './source/scss/**/*.scss',
    ['lint:sass', 'compile:styles', 'shell:generate', 'shell:cache']
  );

  gulp.watch(
    './source/_patterns/**/*.scss',
    ['lint:sass', 'compile:styles', 'shell:generate', 'shell:cache']
  );

  // Watch all my JS files and compile if a file changes.
  gulp.watch([
    './source/js/**/*.js'
  ], ['lint:js', 'concat', 'shell:cache']);

  gulp.watch([
    './source/_patterns/**/*.js'
  ], ['lint:js', 'concat', 'shell:cache']);

  // Watch all my JSON and TWIG files and compile PatternLab if a file changes.
  gulp.watch([
    './source/_patterns/**/*.json'
  ], ['shell:generate']);

  gulp.watch([
    './source/_patterns/**/*.twig'
  ], ['shell:generate']);
});

//=======================================================
// Default Task
//=======================================================
gulp.task('default', ['compile']);
