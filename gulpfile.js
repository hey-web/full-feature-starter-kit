var gulp = require('gulp');
var webpack = require('webpack-stream');
var del = require('del');
var urlAdjuster = require('gulp-css-url-adjuster');
var runSequence = require('run-sequence');
var hash = require('gulp-hash');
var clean = require('gulp-clean');
var replace = require('gulp-replace');

var assetPrefix = '///cdn-host';
var assetPrefixForJs = '//cdn-host';

gulp.task('clean', function() {
  return del([
    '!www/index.html',
    'www/*.js',
    'www/*.css',
    'www/*.png',
    'www/*.jpg',
    'www/*.map',
    'www/images',
    'www/styles',
    'www/fonts',
    'www/js',
    'www/lib'
  ]);
});

gulp.task('adjust-css-url', function() {
  gulp.src('www/style.css')
    .pipe(urlAdjuster({
      prepend: assetPrefix
    }))
    .pipe(hash())
    .pipe(gulp.dest('www/'))
}); 

gulp.task('adjust-js-url', function() {
  gulp.src('www/app.js')
  .pipe(replace(/(\/[^\.]+\.(jpe?g|png|gif|svg){1})/ig, assetPrefixForJs + '$1'))
  .pipe(hash())
  .pipe(gulp.dest('www/'))
})

gulp.task('remove-files', function(){
  return gulp.src(['www/style.css', 'www/app.js'], {read: false})
        .pipe(clean());
})


gulp.task('pack', function() {
  return gulp.src('src/index.jsx')
    .pipe(webpack(require('./webpack.prod.js')))
    .pipe(gulp.dest('www/'));
});

gulp.task('default', function() {
    runSequence('clean', 'pack', 'adjust-css-url', 'adjust-js-url', 'remove-files', function() {
        console.log('Run something else');
    });
});