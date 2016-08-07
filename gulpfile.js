
// ****** CONFIG ******
var
  DIST_DIR      = 'dist',
  DIST_SCRIPTS  = 'dist/scripts',
  DIST_WATCHED  = 'dist/**/*',
  HTML_FILES    = 'app/**/*.html';
  SCSS_FILES    = 'app/styles/**/*.scss',
  SCRIPT_FILES  = 'app/scripts/**/*.js',
  IMG_SRC_FILES = 'app/images/**/*.*',
  FAVICON_SRC_FILES = 'favicons/src/**/*.*',
  IMG_FILES     = 'dist/images/',
  FONT_SRC_FILES    = ['app/styles/vendor/bootstrap/fonts/**/*.*', 'app/styles/vendor/font-awesome/fonts/**/*.*'],
  VENDOR_SCRIPT_FILES  = 'app/vendor/scripts/**/*.js',
  CSS_FILES     = 'dist/styles/',
  FONT_FILES     = 'dist/styles/fonts',
  FAVICON_DATA_FILE = 'app/assets/images/favicons/master/faviconData.json'
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
  browserSync     = require('browser-sync'),
  realFavicon = require ('gulp-real-favicon'),
  fs = require('fs')
;


// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'favicons/master/master_picture.png',
    dest: 'favicons/src',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '0%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#2d89ef',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#e64a19',
        manifest: {
          name: 'AndersCo',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 70.3125,
        themeColor: '#e64a19'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function(done) {
  gulp.src([ 'favicons/master/template.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('favicons/master/markups'));
    done();
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});

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

// gulp.task('images', function() {
//   return gulp
//     .src(IMG_SRC_FILES)
//     .pipe(gulp.dest(IMG_FILES))
// })


gulp.task('favicons', function() {
  return gulp
    .src(FAVICON_SRC_FILES)
    .pipe(gulp.dest(DIST_DIR))
})

// gulp.task('fonts', function() {
//   return gulp
//     .src(FONT_SRC_FILES)
//     .pipe(gulp.dest(FONT_FILES))
// })

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

gulp.task('default', gulp.series('clean',gulp.parallel('html', 'styles','favicons', 'scripts'), 'server', 
  function() {
    gulp.watch([HTML_FILES] , gulp.parallel('html'))
    gulp.watch([SCRIPT_FILES] , gulp.parallel('scripts'))
    gulp.watch([SCSS_FILES] , gulp.parallel('styles'))
    gulp.watch([DIST_WATCHED]).on('change', browserSync.reload)
  }
 )
)