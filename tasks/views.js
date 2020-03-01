const gulp = require('gulp')
const config = require('./_config')
const htmlmin = require('gulp-html-minifier')

gulp.task('views:dist', function () {
  return gulp
    .src(config.paths.views.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.paths.views.dist))
})

gulp.task('views:watch', function (done) {
  gulp.watch(config.paths.views.src, gulp.series('views:dist'))
  done()
})
