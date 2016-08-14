var 
  gulp            = require('gulp'),
  config          = require('./_config'),
  concat          = require('gulp-concat'),
  uglify          = require('gulp-uglify'),
  sourcemaps      = require('gulp-sourcemaps')
;

gulp.task('scripts:dist', function() {
  return gulp.src([config.paths.scripts.vendor, config.paths.scripts.dev])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.scripts.dist))
})

gulp.task('scripts:watch', function(done) {
  gulp.watch(config.paths.scripts.all, gulp.series('scripts:dist'));
  done();
})