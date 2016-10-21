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
  console.log('body: ', req.body)
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
      // console.log('messageSent:', messageSent)
      if(messageSent) {
        response.messageSent = messageSent
        // console.log('Response: ', response )
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

// function sendMail (data) {
//   var MAILGUN_QUEUED = 'queued'
//   var messageSent = false
//
//   nodemailerMailgun.sendMail({
//     from: data.email,
//     to: process.env.MAILGUN_SEND_TO,
//     subject: 'Message from ' + data.name ,
//   text: data.message
//   }, function (err, info) {
//     if (err) {
//       console.log('Error: ' + err);
//     } else {
//       console.log('info.message: ', info.message)
//       if(info.message.toLowerCase().indexOf(MAILGUN_QUEUED) >= 0) {
//         console.log('server: message sent ')
//         messageSent = true
//       }
//     }
//   })
//   return messageSent
// }

// if(mailSent) {
//   console.log('mailSent responded true')
//   // res.render('/', { msg: 'Message sent!' })
//   // response.confirmation = 'message sent!'
//   //  req.flash('msg', 'Message sent!')
//   // res.send(response)
// } else {
//   console.log('sendMail failed')
// }
//     }
//   }
// })
// console.log('sending mail... ')
// var MAILGUN_QUEUED = 'queued'
// nodemailerMailgun.sendMail({
//   from: data.email,
//   to: process.env.MAILGUN_SEND_TO,
//   subject: 'Message from ' + data.name ,
//   text: data.message
// }, function (err, info) {
//   if (err) {
//     console.log('Error: ' + err);
//   }
//   else {
//     console.log('info.message: ', info.message)
//     if(info.message.toLowerCase().indexOf(MAILGUN_QUEUED) >= 0) {
//       console.log('server: message sent ')
//       response.confirmation = 'message sent!'
//     }
//   }
// })
    // nodemailerMailgun.sendMail({
    //   from: 'myemail@example.com',
    //   to: 'anders@anders.co', // An array if you have multiple recipients.
    //   subject: 'AndersCo Test Two',
    //   html: '<b>HTML Test</b>',
    //   //You can use "text:" to send plain-text content. It's oldschool!
    //   text: 'Mailgun test'
    // }, function (err, info) {
    //   if (err) {
    //     console.log('Error: ' + err);
    //   }
    //   else {
    //     console.log('Response: ' + info);
    //   }
    // });

    // res.send(req.body);
      // res.setHeader('Content-Type', 'application/json');
      // get form values
      // validate form values
      // if valid, send, else return error

        // var name = req.body.name;
        // res.send(JSON.stringify({
        //   name: req.body.name || null,
        //   email: req.body.email || null
        // }));

        	// console.log('from express: ' + req.body.name + ', Email: ' + req.body.email);
