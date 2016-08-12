var 
  gulp            = require('gulp'),
  config          = require('./_config'),
  sourcemaps      = require('gulp-sourcemaps'),
  rename          = require('gulp-rename'),
  sass            = require('gulp-sass'),
  autoprefix      = require('gulp-autoprefixer'),
  cleanCSS        = require('gulp-clean-css')
;

gulp.task('styles:dist', function() {
  return gulp
    .src(config.paths.styles.src)
    .pipe(sourcemaps.write())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.styles.dist))

})


gulp.task('styles:watch', function() {
  gulp.watch(config.paths.styles.src, gulp.series('styles:dist'));
})

// gulp.task('styles', gulp.series('styles:dist'));