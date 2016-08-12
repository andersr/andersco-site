var paths = {
		dist_dir: 'dist',
		dist_files: 'dist/**/*.*',
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
	};

module.exports = {
	paths: paths,
	plugins: {
			browserSync: {
	    proxy: "localhost:3000",
	    port: 5000, 
	    files: [ 
	      paths.dist_files 
	    ],
	    browser: 'google chrome',
	    notify: true
    },
    nodemon: {
      script: 'app.js',
      ignore: [
        'gulpfile.js',
        'node_modules/'
      ]
    }
	}
};
