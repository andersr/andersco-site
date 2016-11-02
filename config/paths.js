module.exports = {
		dist_dir: 'dist',
		dist_files: 'dist/**/*.*',
		views: {
			src: 'src/views/**/*.ejs',
			dist: 'dist/views'
		},
		styles: {
			src: 'src/styles/**/*.scss',
			dist: 'dist/public/styles'
		},
		scripts: {
			all: 'src/scripts/**/*.js',
			dev: 'src/scripts/02_dev/**/*.js',
			dist: 'dist/public/scripts',
			init: 'src/scripts/03_init/**/*.js',
			jquery: 'src/scripts/00_jquery/**/*.js',
			vendor: 'src/scripts/01_vendor/**/*.js',
		},
		images: {
			src: ['src/images/**/*.*', '!src/images/favicons'],
			dist: 'dist/public/images'
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
	}
