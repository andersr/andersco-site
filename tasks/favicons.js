const gulp = require('gulp')
const config = require('./_config')

gulp.task('favicons:dist', function () {
  return gulp
    .src(config.paths.favicons.files.src)
    .pipe(gulp.dest(config.paths.favicons.files.dist))
})
