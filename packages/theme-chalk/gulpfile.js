'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const path=require('path')
function compile() {
  return src('./src/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest(path.join(__dirname,'../../lib/css')));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest(path.join(__dirname,'../../lib/css/fonts')));
}

exports.build = series(compile, copyfont);
