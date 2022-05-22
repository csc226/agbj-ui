'use strict';

var _require = require('gulp'),
    series = _require.series,
    src = _require.src,
    dest = _require.dest;

var sass = require('gulp-sass')(require('sass'));

var autoprefixer = require('gulp-autoprefixer');

var cssmin = require('gulp-cssmin');

var path = require('path');

function compile() {
  return src('./src/*.scss').pipe(sass()).pipe(autoprefixer({
    overrideBrowserslist: ['ie > 9', 'last 2 versions'],
    cascade: false
  })).pipe(cssmin()).pipe(dest(path.join(__dirname, '../../lib/css')));
}

function copyfont() {
  return src('./src/fonts/**').pipe(cssmin()).pipe(dest(path.join(__dirname, '../../lib/css/fonts')));
}

exports.build = series(compile, copyfont);