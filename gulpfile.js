var 
  gulp         = require('gulp'),
  requireDir   = require('require-dir'),
  tasks        = requireDir('./tasks', {recurse: true}),
  config       = require('./tasks/_config')
;



gulp.task('clean', gulp.parallel('clean:dist_dir'));

gulp.task('dist', gulp.parallel('styles:dist', 'scripts:dist', 'views:dist'));

gulp.task('default', gulp.series('clean', 'dist', 'server', 'browser-sync:init', gulp.parallel('watch')));

