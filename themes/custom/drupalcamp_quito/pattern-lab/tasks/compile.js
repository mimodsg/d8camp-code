'use strict';

//=======================================================
// Include Our Plugins
//=======================================================
var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var importer = require('node-sass-globbing');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var sync = require('browser-sync');
var stripCssComments = require('gulp-minify-css');

// Export tasks
module.exports = {

  // Base compile function
  baseCompile: function (source, dest) {
    gulp.src(source)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        importer: importer,
        includePaths: [
          './node_modules/breakpoint-sass/stylesheets/',
          './node_modules/susy/sass/',
          './node_modules/compass-mixins/lib/'
        ]
      }).on('error', sass.logError))
      .pipe(prefix({
        browsers: [
          'last 2 version',
          'IE >= 10'
        ],
        cascade: false
      }))
      .pipe(stripCssComments({preserve: /^# sourceMappingURL=/}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dest))
      .pipe(sync.stream({match: '**/*.css'}));
  },

  // Compile PatternLab
  styles: function () {
    this.baseCompile('./source/scss/style.scss', './source/css/');
    this.baseCompile('./source/scss/style.scss', '../dist/css');
    shell.task(['php core/console --generate']);
  }
};
