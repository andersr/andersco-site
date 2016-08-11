// update to use this model
  // paths: {
  //   base: env,
  //   sources: {
  //     docs     : 'src/pug/*.pug',
  //     markup   : 'src/pug/**/*.pug',
  //     overwatch: env + '**/*.{html,js,css}',
  //     scripts  : 'src/js/**/*.js',
  //     styles   : 'src/stylus/**/*.styl'
  //   },
  //   destinations: {
  //     dist: './dist',
  //     css : env + 'css/',
  //     html: env,
  //     js  : env + 'js/'
  //   }
  // }
var env = 'public/';

module.exports = {
	paths: {
		dist_dir: 'dist',
		views: {
			src: 'src/views/**/*.ejs',
			dist: 'dist/views',
			del: 'dist/views/**/*.*'
		},
		styles: {
			src: 'src/styles/**/*.scss',
			dist: 'dist/public/styles',
			del: 'dist/public/styles/*.css'
		},
	  favicons: {
			files: {
	      src: 'src/images/favicons/dist/files/*.*',
			  dist: 'dist/public'
			},
			markup: {
				src: 'src/images/favicons/dist/markup.html',
				target: 'src/views/index.ejs'
			}
		}
	},
	plugins: {
		browserSync: {
      port   : 4000,
      server : {
        baseDir: env
      }
    }
	}
};


	