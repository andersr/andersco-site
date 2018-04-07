const gulp = require('gulp')

gulp.task('watch', gulp.parallel('styles:watch', 'scripts:watch', 'views:watch', 'images:watch'))