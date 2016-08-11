var 
  gulp            = require('gulp'),
  config       = require('./config.json'),
  cleanhtml       = require('gulp-cleanhtml')
;

gulp.task('views:dist', function() {
  return gulp
    .src(config.paths.views.src)
    .pipe(cleanhtml())
    .pipe(gulp.dest(config.paths.views.dist))
})

gulp.task('views', gulp.series('views:dist'));