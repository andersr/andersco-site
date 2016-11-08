const gulp = require('gulp')
const requireDir = require('require-dir')
requireDir('./tasks')

gulp.task('clean', gulp.parallel('clean:dist_dir'))

gulp.task('dist', gulp.parallel('styles:dist', 'scripts:lint', 'scripts:dist', 'views:dist', 'favicons:dist', 'images:dist'))

gulp.task('default', gulp.series('clean', 'dist', 'server', 'browser-sync:init', gulp.parallel('watch')))
