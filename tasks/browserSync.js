const gulp = require('gulp')
const config = require('./_config')
const browserSync = require('browser-sync').create()

function browserSyncInit (done) {
  browserSync.init(config.plugins.browserSync)
  done()
}

gulp.task('browser-sync:init', browserSyncInit)
