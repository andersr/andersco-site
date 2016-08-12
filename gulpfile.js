var 
  gulp         = require('gulp'),
  requireDir   = require('require-dir'),
  tasks        = requireDir('./tasks', {recurse: true}),
  config       = require('./tasks/_config')
;

gulp.task('clean', gulp.parallel('clean:dist_dir'));

gulp.task('dist', gulp.parallel('styles:dist', 'views:dist', 'favicons:dist'));

gulp.task('watch', gulp.parallel('styles:watch', 'views:watch'));

gulp.task('default', gulp.series('clean', 'dist', 'server', gulp.parallel('watch', 'browser-sync')));

