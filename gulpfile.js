var 
  gulp         = require('gulp'),
  requireDir   = require('require-dir'),
  tasks        = requireDir('./tasks', {recurse: true}),
  config       = require('./tasks/config'),
  browserSync  = require('browser-sync').create(),
  nodemon = require('gulp-nodemon');
;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('browser-sync', gulp.series('nodemon'), function() {
  browserSync.init({
    proxy: "localhost:8080",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

// gulp.task('server', gulp.series('nodemon', 'browser-sync'));

gulp.task('dist:watch', function(){
  gulp.watch('dist/**/*.*', browserSync.reload );
})


gulp.task('default', gulp.series('del:dist_dir', 'browser-sync', gulp.parallel('styles', 'views', 'favicons', 'dist:watch')));



// gulp.task('livereload', function() {
//   livereload.listen();
  
// });

// gulp.task('watch', gulp.series( 'livereload', gulp.parallel('views:watch','styles:watch')));

