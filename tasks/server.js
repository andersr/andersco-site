const gulp = require('gulp')
const config = require('./_config')
const nodemon = require('gulp-nodemon')

gulp.task('server', function (cb) {
  let called = false
  return nodemon(config.plugins.nodemon)
  .on('start', function () {
    if (!called) {
      called = true
      cb()
    }
  })
})
