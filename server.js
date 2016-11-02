require('dotenv').config()
var path = require('path')
var helmet = require('helmet')
var express = require('express')
var bodyParser = require('body-parser')
var validateMail = require('./server/validateMail')
var sendMail = require('./server/sendMail')
var app = express()
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false
}))

var port = process.env.PORT || 3000
var env = process.env.NODE_ENV

if (env === 'staging') {
  var basicAuth = require('basic-auth-connect')
  app.use(basicAuth(process.env.NPM_CONFIG_BASIC_AUTH_USER, process.env.NPM_CONFIG_BASIC_AUTH_PWD))
}

app.set('views', path.join(__dirname, '/dist/views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/dist/public'))

app.get('/', function (req, res) {
  res.locals.currentYear = new Date().getFullYear()
  res.render('index')
})

app.post('/mail', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  var result = {
    spam: false
  }
  // result.messageSent = true
  // res.send(result)

  if(req.body.honeypot !== '') {
    result.spam = true
    res.send(result)
  } else {

    data = {
      email: req.body.email,
      name: req.body.name,
      message: req.body.message
    }

    result.errors = validateMail(data)

    if(result.errors.length > 0) {
      res.send(result)
    } else {
      sendMail(data, function (messageSent) {
        result.messageSent = messageSent
        res.send(result)
      })
    }
  }
})

// Wildcard redirect to root
app.use(function(req, res) {
  res.status(400);
  res.redirect('/');
});

app.listen(port, function () {
  if (env !== 'production') {
    console.log('App running at http://localhost:' + port)
  }
})
