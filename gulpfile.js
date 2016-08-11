var 
  gulp         = require('gulp'),
  requireDir   = require('require-dir'),
  tasks        = requireDir('./tasks', {recurse: true}),
  config       = require('./tasks/config')
;

gulp.task('watch', gulp.parallel('views:watch','styles:watch'));

gulp.task('default', gulp.series('del:dist_dir', gulp.parallel('styles', 'views', 'favicons'), 'watch'));

