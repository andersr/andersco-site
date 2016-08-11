require('dotenv').config();
var path = require('path');
var express = require('express');
var app = express();

// if (app.get('env') == 'development') {
// 	var browserSync = require("browser-sync").create('DevServer')

//   browserSync.init({ logSnippet: false });
//   app.use(require('connect-browser-sync')(browserSync));

// }

// else if(app.get('env') == 'staging'){
// 	  var basicAuth = require('basic-auth-connect');
//     app.use(basicAuth(process.env.NPM_CONFIG_BASIC_AUTH_USER, process.env.NPM_CONFIG_BASIC_AUTH_PWD));
// }



// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('views', path.join(__dirname, '/dist/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist/public'));

// set the home page
app.get('/', function(req, res) {
	res.render('index');
});

app.listen(port, function() {
	console.log('App running at http://localhost:' + port);
});