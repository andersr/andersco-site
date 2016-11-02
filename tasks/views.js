var
  gulp      = require('gulp'),
  config    = require('./_config'),
  cleanhtml = require('gulp-cleanhtml')
;

gulp.task('views:dist', function() {
  return gulp
    .src(config.paths.views.src)
    .pipe(cleanhtml())
    .pipe(gulp.dest(config.paths.views.dist))
})

gulp.task('views:watch', function(done) {
  gulp.watch(config.paths.views.src, gulp.series('views:dist'))
  done()
})
