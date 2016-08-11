var 
  gulp            = require('gulp'),
  config          = require('../config'),
  inject = require('gulp-inject')
;


gulp.task('favicons:copy_files', function() {
  return gulp
    .src(config.paths.favicons.files.src)
    .pipe(gulp.dest(config.paths.favicons.files.dist))
});

gulp.task('favicons', gulp.series('favicons:copy_files'));



// gulp.task('favicons:inject_markup', function(done) {

//   var target = gulp.src("src/views/test.html");
//   var source = gulp.src(config.paths.favicons.markup.src, {read: false});

//   return target.pipe(inject(source)).pipe(gulp.dest('./tmp'));

//   console.log("target: ", "src/views/test.html");
//   console.log("src: ",config.paths.favicons.markup.src);
  
//   gulp.src(config.paths.favicons.markup.target)
//   .pipe(inject(gulp.src(config.paths.favicons.markup.src), {
//     starttag: '<!-- inject:favicons:{{ext}} -->',
//     transform: function (filePath, file) {
//       // return file contents as string 
//       return file.contents.toString('utf8')
//     }
//   }))
//   done();

// })



// gulp.task('favicons:inject_markup', function() {
//   return gulp
//     .src(config.paths.favicons.files.src)
//     .pipe(gulp.dest(config.paths.favicons.files.dist))
// })


// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
// gulp.task('inject-favicon-markups', function(done) {
//   gulp.src([ 'assets/favicons/master/template.html' ])
//     .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
//     .pipe(gulp.dest('assets/favicons/master/markups'));
//     done();
// });


// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
// gulp.task('check-for-favicon-update', function(done) {
//   var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
//   realFavicon.checkForUpdates(currentVersion, function(err) {
//     if (err) {
//       throw err;
//     }
//   });
// });

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
// gulp.task('generate-favicon', function(done) {
//   realFavicon.generateFavicon({
//     masterPicture: 'favicons/master/master_picture.png',
//     dest: 'favicons/src',
//     iconsPath: '/',
//     design: {
//       ios: {
//         pictureAspect: 'backgroundAndMargin',
//         backgroundColor: '#ffffff',
//         margin: '0%',
//         assets: {
//           ios6AndPriorIcons: false,
//           ios7AndLaterIcons: false,
//           precomposedIcons: false,
//           declareOnlyDefaultIcon: true
//         }
//       },
//       desktopBrowser: {},
//       windows: {
//         pictureAspect: 'noChange',
//         backgroundColor: '#2d89ef',
//         onConflict: 'override',
//         assets: {
//           windows80Ie10Tile: false,
//           windows10Ie11EdgeTiles: {
//             small: false,
//             medium: true,
//             big: false,
//             rectangle: false
//           }
//         }
//       },
//       androidChrome: {
//         pictureAspect: 'noChange',
//         themeColor: '#e64a19',
//         manifest: {
//           name: 'AndersCo',
//           display: 'standalone',
//           orientation: 'notSet',
//           onConflict: 'override',
//           declared: true
//         },
//         assets: {
//           legacyIcon: false,
//           lowResolutionIcons: false
//         }
//       },
//       safariPinnedTab: {
//         pictureAspect: 'blackAndWhite',
//         threshold: 70.3125,
//         themeColor: '#e64a19'
//       }
//     },
//     settings: {
//       scalingAlgorithm: 'Mitchell',
//       errorOnImageTooSmall: false
//     },
//     markupFile: FAVICON_DATA_FILE
//   }, function() {
//     done();
//   });
// });
