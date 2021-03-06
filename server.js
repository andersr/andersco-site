require('dotenv').config()
const path = require('path')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const validateMail = require('./server/validateMail')
const sendMail = require('./server/sendMail')
const app = express()
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== 'development') {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}

app.use(requireHTTPS)
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

if (env === 'staging') {
  const basicAuth = require('basic-auth-connect')
  app.use(basicAuth(process.env.NPM_CONFIG_BASIC_AUTH_USER, process.env.NPM_CONFIG_BASIC_AUTH_PWD))
}

app.set('views', path.join(__dirname, '/dist/views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/dist/public'))


// app.get('/resume', (req, res) => res.redirect('https://drive.google.com/open?id=1X_dbyuY2lR1jneX1hAfgWrF0eFemFFGG'))
app.get('/', function (req, res) {
  res.locals.currentYear = new Date().getFullYear()
  res.render('index')
})

app.post('/mail', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const result = {
    spam: false,
    tooShort: false,
  }

  const noLineBreaks = req.body.message.replace(/(\r\n|\n|\r)/gm, ' ')
  const noExtraSpaces = noLineBreaks.replace(/\s+/g,' ')
  const words = noExtraSpaces.split(' ')

  if (req.body.honeypot !== '') {
    result.spam = true
    res.send(result)
  } else if(words.length < 5){
    result.tooShort = true
    res.send(result)
  } else {
    const data = {
      email: req.body.email,
      name: req.body.name,
      message: req.body.message
    }
    
    result.errors = validateMail(data)
    if (result.errors.length > 0) {
      res.send(result)
    } else {
      sendMail(data, messageSent => {
        result.messageSent = messageSent
        res.send(result)
      })
    }
  }
})

// Wildcard redirect to root
app.use(function (req, res) {
  res.status(400)
  res.redirect('/')
})

app.listen(port, function () {
  if (env !== 'production') {
    console.log('App running at http://localhost:' + port)
  }
})
