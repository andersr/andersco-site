var
  gulp         = require('gulp'),
  config       = require('./_config')
;

gulp.task('watch', gulp.parallel('styles:watch', 'scripts:watch', 'views:watch', 'images:watch'))
