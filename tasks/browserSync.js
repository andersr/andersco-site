var 
  gulp         = require('gulp'),
  config       = require('./_config'),
  browserSync  = require('browser-sync').create()
;

gulp.task('browser-sync', function() {
  browserSync.init(config.plugins.browserSync);
});

