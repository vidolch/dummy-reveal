var gulp = require('gulp');
var serve = require('gulp-serve');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

gulp.task('serve', serve('src'));
gulp.task('serve-build', serve(['src']));
gulp.task('serve-prod', serve({
  root: ['dist'],
  port: 8000,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));

gulp.task('sass', function () {
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src('src/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});
