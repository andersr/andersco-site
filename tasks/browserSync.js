var
  gulp         = require('gulp'),
  config       = require('./_config'),
  browserSync  = require('browser-sync').create()
;

function browserSyncInit(done) {
	browserSync.init(config.plugins.browserSync)
  done()
}

gulp.task('browser-sync:init', browserSyncInit)
