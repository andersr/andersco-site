var 
  gulp     = require('gulp'),
  config   = require('./_config'),
  del      = require('del')
;

gulp.task('clean:dist_dir', function() {
  return del(config.paths.dist_dir);
});