var 
  gulp         = require('gulp'),
  requireDir   = require('require-dir'),
  tasks        = requireDir('./tasks', {recurse: true}),
  config       = require('./tasks/config')
;

gulp.task('default', 
  gulp.series(
    'del:dist_dir', 
    gulp.parallel(
      'styles', 
      'views', 
      'favicons'
    )
  )
);

