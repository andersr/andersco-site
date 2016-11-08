const gulp = require('gulp')
const config = require('./_config')
const del = require('del')

gulp.task('clean:dist_dir', function () {
  return del(config.paths.dist_dir)
})
