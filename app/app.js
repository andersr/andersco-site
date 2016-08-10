require('dotenv').config();
var path = require('path');

var express = require('express');
var basicAuth = require('basic-auth-connect');
var app = express();
// app.use(basicAuth('test', 'user'));
app.use(basicAuth(process.env.NPM_CONFIG_BASIC_AUTH_USER, process.env.NPM_CONFIG_BASIC_AUTH_PWD));

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.listen(port, function() {
	console.log('App running at http://localhost:' + port);
});