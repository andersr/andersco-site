
// ****** CONFIG ******
var
  DIST_DIR      = 'dist',
  DIST_SCRIPTS  = 'dist/scripts',
  DIST_WATCHED  = 'dist/**/*',
  HTML_FILES    = 'app/**/*.html';
  SCSS_FILES    = 'app/styles/**/*.scss',
  SCRIPT_FILES  = 'app/scripts/**/*.js',
  IMG_SRC_FILES = 'app/images/**/*.*',
  IMG_FILES     = 'dist/images/',
  FONT_SRC_FILES    = ['app/styles/vendor/bootstrap/fonts/**/*.*', 'app/styles/vendor/font-awesome/fonts/**/*.*'],
  VENDOR_SCRIPT_FILES  = 'app/vendor/scripts/**/*.js',
  CSS_FILES     = 'dist/styles/',
  FONT_FILES     = 'dist/styles/fonts'
;
// ****** PACKAGES ******
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
  browserSync     = require('browser-sync')
;

//src: https://github.com/frontend-tooling/sample-project-gulp/blob/ch7/gulpfile.js
var
 isprod = false,
 noop = function() {
   return through.obj();
 },
 dev = function(task) {
  return isprod ? noop() : task;
 },
 prod = function(task) {
  return isprod ? task : noop();
 }


// ****** TASKS ******
gulp.task('clean', function(done) {
  return del(['dist'], done)
})

gulp.task('html', function() {
  return gulp
    .src(HTML_FILES)
    .pipe(cleanhtml())
    .pipe(gulp.dest(DIST_DIR))
})

gulp.task('images', function() {
  return gulp
    .src(IMG_SRC_FILES)
    .pipe(gulp.dest(IMG_FILES))
})

gulp.task('fonts', function() {
  return gulp
    .src(FONT_SRC_FILES)
    .pipe(gulp.dest(FONT_FILES))
})

gulp.task('lint', function() {
   return gulp.src([SCRIPT_FILES])
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
})

gulp.task('scripts',
  gulp.series('lint', function scriptsInternal() {
    return gulp.src([ "app/vendor/scripts/jquery.js",
        "app/vendor/scripts/bootstrap.js",
        "app/vendor/scripts/freelancer.js",
        SCRIPT_FILES])
      .pipe(order([
        'app/vendor/scripts/jquery.js',
        'app/vendor/scripts/bootstrap.js',
        'app/vendor/scripts/freelancer.js',
        SCRIPT_FILES
        ], { base: './' }))
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST_SCRIPTS))
   })
)


gulp.task('styles', function() {
  return gulp
    .src(SCSS_FILES)
    .pipe(sourcemaps.write())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(CSS_FILES))
})

gulp.task('server', function(done) {
  browserSync({
    server: {
      baseDir: ['dist', 'app']
    }
  })
  done()
})


// gulp.parallel('html', 'styles', 'scripts')

gulp.task('default', gulp.series('clean',gulp.parallel('html', 'styles', 'fonts','images','scripts'), 'server', 
  function() {
    gulp.watch([HTML_FILES] , gulp.parallel('html'))
    gulp.watch([SCRIPT_FILES] , gulp.parallel('scripts'))
    gulp.watch([SCSS_FILES] , gulp.parallel('styles'))
    gulp.watch([DIST_WATCHED]).on('change', browserSync.reload)
  }
 )
)