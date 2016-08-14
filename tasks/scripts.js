var 
  gulp            = require('gulp'),
  config          = require('./_config'),
  concat          = require('gulp-concat'),
  uglify          = require('gulp-uglify'),
  sourcemaps      = require('gulp-sourcemaps')
;


gulp.task('scripts:dist', function() {
  return gulp.src(config.paths.scripts.all)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.scripts.dist))
})

gulp.task('scripts:watch', function() {
  gulp.watch(config.paths.scripts.dev, gulp.series('scripts:dist'));
})




// gulp.task('scripts',
//   gulp.series('lint', function scriptsInternal() {
//     return gulp.src([ "src/vendor/scripts/jquery.js",
//         "src/vendor/scripts/bootstrap.js",
//         "src/vendor/scripts/freelancer.js",
//         SCRIPT_FILES])
//       .pipe(order([
//         'src/vendor/scripts/jquery.js',
//         'src/vendor/scripts/bootstrap.js',
//         'src/vendor/scripts/freelancer.js',
//         SCRIPT_FILES
//         ], { base: './' }))
//       .pipe(sourcemaps.init())
//       .pipe(concat('main.min.js'))
//       .pipe(uglify())
//       .pipe(sourcemaps.write())
//       .pipe(gulp.dest(DIST_SCRIPTS))
//    })
// )

//lint my scripts
// gulp.task('scripts:lint', function() {
//     return gulp.src(config.paths.scripts.src)
//     .pipe(jshint())
//     .pipe(jshint.reporter(jshintStylish))
// })
