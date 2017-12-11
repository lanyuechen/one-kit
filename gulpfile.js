'use strict';

const gulp        = require('gulp');
const babel       = require('gulp-babel');
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');

// 编译js文件
gulp.task('babel', function(){
  return gulp.src(['./src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'))
});

// 合并样式文件
gulp.task('concat', ['sass'], function() {
  return gulp.src(['./dist/index.css'])
    .pipe(concat("index.css"))
    .pipe(gulp.dest('dist'));
});

// 编译sass
gulp.task('sass', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel']);
