var 
  gulp            = require('gulp'),
  del             = require('del'),
  cleanhtml       = require('gulp-cleanhtml')
;

var config       = require('./config.json');

gulp.task('views:del', function() {
  return del(config.paths.views.del);
})

gulp.task('views:clean', function() {
  return gulp
    .src(config.paths.views.src)
    .pipe(cleanhtml())
    .pipe(gulp.dest(config.paths.views.dist))
})

gulp.task('views', gulp.series('views:del', 'views:clean'));