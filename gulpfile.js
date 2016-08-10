var 
  gulp            = require('gulp'),
  order           = require("gulp-order"),
  del             = require('del'),
  // wiredep         = require('wiredep').stream,
  jshint          = require('gulp-jshint'),
  jshintStylish   = require('jshint-stylish'),
  // mainBowerFiles  = require('main-bower-files'),
  concat          = require('gulp-concat'),
  uglify          = require('gulp-uglify')
  sourcemaps      = require('gulp-sourcemaps'),
  rename          = require('gulp-rename'),
  sass            = require('gulp-sass'),
  cleanhtml       = require('gulp-cleanhtml'),
  autoprefix      = require('gulp-autoprefixer'),
  cleanCSS        = require('gulp-clean-css'),
  browserSync     = require('browser-sync'),
  realFavicon = require ('gulp-real-favicon'),
  fs = require('fs')
;

var requireDir   = require('require-dir');
var tasks        = requireDir('./tasks');
var config       = require('./tasks/config.json');



gulp.task('default', gulp.parallel('styles', 'views'));

// var
//   APP_DIR         = 'app',
//   DIST_SCRIPTS    = 'dist/scripts',
//   DIST_WATCHED    = 'dist/**/*',
//   SRC_VIEW_FILES  = 'src/views/**/*.ejs';
//   SCSS_FILES    = 'src/styles/**/*.scss',
//   SCRIPT_FILES  = 'src/scripts/**/*.js',
//   IMG_SRC_FILES = 'src/images/**/*.*',
//   FAVICON_SRC_FILES = 'assets/favicons/src/**/*.*',
//   IMG_FILES     = 'dist/images/',
//   FONT_SRC_FILES    = ['app/styles/vendor/bootstrap/fonts/**/*.*', 'app/styles/vendor/font-awesome/fonts/**/*.*'],
//   VENDOR_SCRIPT_FILES  = 'app/vendor/scripts/**/*.js',
//   CSS_FILES     = 'dist/styles/',
//   FONT_FILES     = 'dist/styles/fonts',
//   FAVICON_DATA_FILE = 'app/assets/images/favicons/master/faviconData.json'
// ;
// ****** PACKAGES ******



//src: https://github.com/frontend-tooling/sample-project-gulp/blob/ch7/gulpfile.js
// var
//  isprod = false,
//  noop = function() {
//    return through.obj();
//  },
//  dev = function(task) {
//   return isprod ? noop() : task;
//  },
//  prod = function(task) {
//   return isprod ? task : noop();
//  }


// ****** TASKS ******
// gulp.task('clean', function(done) {
//   return del(['dist'], done)
// })

// console.log("views dist: ", config.paths.views.del);

// gulp.task('views:del', function() {
//   return del(config.paths.views.del);
// })

// gulp.task('views:clean', function() {
//   return gulp
//     .src(config.paths.views.src)
//     .pipe(cleanhtml())
//     .pipe(gulp.dest(config.paths.views.dist))
// })

// gulp.task('views', gulp.series('views:del', 'views:clean'));

// gulp.task('images', function() {
//   return gulp
//     .src(IMG_SRC_FILES)
//     .pipe(gulp.dest(IMG_FILES))
// })


// gulp.task('favicons', function() {
//   return gulp
//     .src(FAVICON_SRC_FILES)
//     .pipe(gulp.dest(DIST_DIR))
// })

// gulp.task('fonts', function() {
//   return gulp
//     .src(FONT_SRC_FILES)
//     .pipe(gulp.dest(FONT_FILES))
// })

// gulp.task('lint', function() {
//    return gulp.src([SCRIPT_FILES])
//     .pipe(jshint())
//     .pipe(jshint.reporter(jshintStylish))
// })

// gulp.task('scripts',
//   gulp.series('lint', function scriptsInternal() {
//     return gulp.src([ "app/vendor/scripts/jquery.js",
//         "app/vendor/scripts/bootstrap.js",
//         "app/vendor/scripts/freelancer.js",
//         SCRIPT_FILES])
//       .pipe(order([
//         'app/vendor/scripts/jquery.js',
//         'app/vendor/scripts/bootstrap.js',
//         'app/vendor/scripts/freelancer.js',
//         SCRIPT_FILES
//         ], { base: './' }))
//       .pipe(sourcemaps.init())
//       .pipe(concat('main.min.js'))
//       .pipe(uglify())
//       .pipe(sourcemaps.write())
//       .pipe(gulp.dest(DIST_SCRIPTS))
//    })
// )


// gulp.task('styles', function() {
//   return gulp
//     .src(SCSS_FILES)
//     .pipe(sourcemaps.write())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefix())
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest(CSS_FILES))
// })

// gulp.task('server', function(done) {
//   browserSync({
//     server: {
//       baseDir: ['dist', 'app']
//     }
//   })
//   done()
// })


// gulp.task('heroku:production', ['libs',  'less', 'jade', 'js']);


// gulp.parallel('html', 'styles', 'scripts')

