// var
//   gulp        = require('gulp'),
//   browserSync = require("browser-sync").create(),
//   nodemon     = require('gulp-nodemon'),
//   config      = require('./config')
// ;
// var notify = require('gulp-notify');
// var livereload = require('gulp-livereload');


// gulp.task('serve', function() {
// 	// listen for changes
// 	livereload.listen();
// 	// configure nodemon
// 	nodemon({
// 		// the script to run the app
// 		script: 'app.js',
// 		ext: 'js'
// 	}).on('restart', function(){
// 		// when the app has restarted, run livereload.
// 		gulp.src('dist/views/index.ejs')
// 			.pipe(livereload({ start: true }))
// 			.pipe(notify('Reloading page, please wait...'));
// 	})
// })
// gulp.task('nodemon', function(cb) {

//   var started = false;
	
// 	return nodemon({
// 		script: 'app.js'
// 	}).on('start', function () {
// 		// to avoid nodemon being started multiple times
// 		// thanks @matthisk
// 	var browserSync = require("browser-sync").get('My server');
// 	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);

// 		if (!started) {
// 			cb();
// 			started = true; 
// 		} 
// 	});

// });


// gulp.task('browser-sync', gulp.series('nodemon'),function() {
// 	var browserSync = require("browser-sync").get('My server');
// 	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);

// });

		// browserSync.init({
		// 	proxy: "http://localhost:8080",
	 //    files: config.paths.dist_files,
	 //    browser: "google chrome",
	 //    port: 4000,
		// });
		// browserSync.watch(config.paths.dist_files).on('change', browserSync.reload);

// if (app.get('env') == 'development') {
// 	var browserSync = require("browser-sync").create('DevServer')

//   browserSync.init({ logSnippet: false });
//   app.use(require('connect-browser-sync')(browserSync));



// now, retrieve the instance in another file...
// var browserSync = require("browser-sync").get('DevServer');

// and call any methods on it.
// browserSync.watch('*.html').on('change', browserSync.reload);

  // browsersync = require('browser-sync'),
  // vss         = require('vinyl-source-stream'),
  // vb          = require('vinyl-buffer'),
  // vf          = require('vinyl-file'),
	 // var server = browsersync.create();
  //  server.init(config.plugins.browserSync);

  // return server.watch(config.paths.dist_files, function(evt, file) {
  //   if (evt === 'change') {
  //     server.reload();
  //     vf.readSync(file)
  //       .pipe(vss(file))
  //       .pipe(vb())
  //       .pipe(server.stream());	
  //   }
//   start = function() {
//     var server = browsersync.create();
//     server.init(config.plugins.browserSync);

//     return server.watch(src.overwatch, function(evt, file) {
//       if (evt === 'change' && file.indexOf('.css') === -1)
//         server.reload();
//       if (evt === 'change' && file.indexOf('.css') !== -1)
//         vf.readSync(file)
//           .pipe(vss(file))
//           .pipe(vb())
//           .pipe(server.stream());
//     });
//   };

// module.exports = {
//   start: start
// };

// ,
//   opts        = gConfig.pluginOpts,
//   src         = gConfig.paths.sources,
//   dest        = gConfig.paths.destinations,
  /*
    start; creates local static livereload server using browser-sync.
  */

// gulp.task('dist:watch', function() {
//   gulp.watch(config.paths.dist_dir, gulp.series('server'));
// });