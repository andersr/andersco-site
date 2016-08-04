
// ****** CONFIG ******
var
  DIST_DIR      = 'dist',
  DIST_SCRIPTS  = 'dist/scripts',
  DIST_WATCHED  = 'dist/**/*',
  HTML_FILES    = 'app/**/*.html';
  SCSS_FILES    = 'app/styles/**/*.scss',
  SCRIPT_FILES  = 'app/scripts/**/*.js'   
  CSS_FILES     = 'dist/styles'
;
// ****** PACKAGES ******
var 
  gulp            = require('gulp'),
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
    // .pipe(wiredep())
    .pipe(cleanhtml())
    .pipe(gulp.dest(DIST_DIR))
})

gulp.task('lint', function() {
   return gulp.src([SCRIPT_FILES])
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
})

gulp.task('scripts',
  gulp.series('lint', function scriptsInternal() {
    // var glob = mainBowerFiles('**/*.js')
    // glob.push(SCRIPT_FILES)
    return gulp.src(SCRIPT_FILES)
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

gulp.task('default', gulp.series('clean',gulp.parallel('html', 'styles', 'scripts'), 'server', 
  function() {
    gulp.watch([HTML_FILES] , gulp.parallel('html'))
    gulp.watch([SCRIPT_FILES] , gulp.parallel('scripts'))
    gulp.watch([SCSS_FILES] , gulp.parallel('styles'))
    gulp.watch([DIST_WATCHED]).on('change', browserSync.reload)
  }
 )
)