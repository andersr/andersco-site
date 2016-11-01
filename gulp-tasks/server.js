var
  gulp         = require('gulp'),
  config       = require('./_config'),
  nodemon      = require('gulp-nodemon');
;

gulp.task('server', function (cb) {
  var called = false
  return nodemon(config.plugins.nodemon)
  .on('start', function () {
    if (!called) {
      called = true
      cb()
    }
  })
})
