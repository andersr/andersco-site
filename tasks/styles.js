const gulp = require('gulp')
const config = require('./_config')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')

gulp.task('styles:dist', function () {
  return gulp
    .src(config.paths.styles.src)
    .pipe(sourcemaps.write())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.styles.dist))
})

gulp.task('styles:watch', function (done) {
  gulp.watch(config.paths.styles.src, gulp.series('styles:dist'))
  done()
})
