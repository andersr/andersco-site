var 
  gulp         = require('gulp'),
  config       = require('./_config')
;

// function watch(done) {
//   gulp.parallel('styles:watch', 'scripts:watch', 'views:watch');
//   done();
// }

gulp.task('watch',  gulp.parallel('styles:watch', 'scripts:watch', 'views:watch'));

