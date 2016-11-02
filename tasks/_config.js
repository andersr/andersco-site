var paths = require('../config/paths')

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
	    notify: {
				styles: {
          top: 'auto',
        bottom: '0'
      }
	  },
			open: false
    },
    nodemon: {
      script: 'server.js',
      ignore: [
        'gulpfile.js',
        'node_modules/',
        '/tasks'
      ]
    }
	}
}
