var gulp = require('gulp')
var config = require('./_config')
var concat = require('gulp-concat')
var uglify  = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var eslint = require('gulp-eslint')
var lintReporter = require('eslint-friendly-formatter')

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

// config.paths.scripts.jquery, config.paths.scripts.vendor, config.paths.scripts.dev,
