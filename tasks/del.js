var 
  gulp     = require('gulp'),
  config   = require('./config'),
  del      = require('del')
;

gulp.task('del:dist_dir', function() {
  return del(config.paths.dist_dir);
});