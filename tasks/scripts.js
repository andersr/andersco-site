const gulp = require('gulp')
const config = require('./_config')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')
const lintReporter = require('eslint-friendly-formatter')

gulp.task('scripts:dist', function () {
  return gulp.src([
    config.paths.scripts.jquery,
    config.paths.scripts.vendor,
    config.paths.scripts.dev,
    config.paths.scripts.init
  ])
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.paths.scripts.dist))
})

gulp.task('scripts:lint', function () {
  return gulp.src(config.paths.scripts.dev)
    .pipe(eslint())
    .pipe(eslint.format(lintReporter))
})

gulp.task('scripts:watch', function (done) {
  gulp.watch(config.paths.scripts.all, gulp.series('scripts:lint', 'scripts:dist'))
  done()
})
