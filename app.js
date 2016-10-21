require('dotenv').config()
var path = require('path')
var express = require('express')
var expressValidator = require('express-validator')
var session = require('express-session')
var bodyParser = require('body-parser')
// var flash = require('connect-flash')
var emailValidator = require("email-validator")
var sendMail = require('./server/sendMail')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false
}))

app.use(expressValidator())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))
// app.use(flash())
// app.use(function (req, res, next) {
//    res.locals.messages = req.flash()
//   next()
// })

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
  res.render('index')
})

app.post('/mail', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  // console.log('body: ', req.body)
  var data = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  }

  var response = {
    errors: [],
    messageSent: false
  }

  function isEmpty (str) {
    return str === ''
  }
  if(isEmpty(data.name)) {
    response.errors.push('name')
  }
  if(isEmpty(data.message)) {
    response.errors.push('message')
  }
  if(isEmpty(data.email) || !emailValidator.validate(data.email)) {
    response.errors.push('email')
  }
  if(response.errors.length > 0){
    res.send(response)
  } else {
    sendMail(data, function (messageSent) {
      if(messageSent) {
        response.messageSent = messageSent
        res.send(response)
      } else {
        console.log('Mail send error')
      }
    })
  }
})

app.listen(port, function () {
  console.log('App running at http://localhost:' + port)
})
