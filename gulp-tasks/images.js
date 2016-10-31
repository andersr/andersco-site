var gulp = require('gulp')
var config = require('./_config')

gulp.task('images:dist', function() {
  return gulp
    .src(config.paths.images.src)
    .pipe(gulp.dest(config.paths.images.dist))
})

gulp.task('images:watch', function (done) {
  gulp.watch(config.paths.images.src, gulp.series('images:dist'))
  done()
})
