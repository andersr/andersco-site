require('dotenv').config()
var path = require('path')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
// var flash = require('req-flash')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false
}))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error
  var msg = req.session.success
  delete req.session.error
  delete req.session.success
  res.locals.message = ''
  if (err) res.locals.message = '<p class="msg error"> Test' + err + '</p>'
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>'
  next()
});

// app.use(flash())
// app.use(function (req, res, next) {
//   res.locals.error_messages = req.flash('error_messages')
//   next()
// })

var port = process.env.PORT || 3000
var env = process.env.NODE_ENV

if (env === 'staging') {
  var basicAuth = require('basic-auth-connect')
  app.use(basicAuth(process.env.NPM_CONFIG_BASIC_AUTH_USER, process.env.NPM_CONFIG_BASIC_AUTH_PWD))
}

// FORMS


app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// MAIL
var nodemailer = require('nodemailer')
var mailgun = require('nodemailer-mailgun-transport')
var auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
}
var nodemailerMailgun = nodemailer.createTransport(mailgun(auth))


app.set('views', path.join(__dirname, '/dist/views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/dist/public'))

app.get('/', function (req, res) {
  res.render('index')
})


// app.get('/', function (req, res) {
//   res.render('index', { messages: req.flash('info') })
// })

app.post('/mail', function (req, res) {
  // res.setHeader('Content-Type', 'application/json')
  // console.log('body: ', req.body)
  req.session.error = 'Test error'
  // var data = {
  //   email: req.body.email,
  //   name: req.body.name ,
  //   message: req.body.message
  // }
  var messages = {
    error: 'My Error'
  }
  // res.send()
   res.send(messages)

  if(req.body.name === ''){
    // console.log('name is empty')
    // req.flash('info', 'Test message')
    // app.locals.errors.push('Name cannot be empty')
  } else {
    // app.locals.errors = []
  }
  // res.render('error', { errors: app.locals.errors })

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
  //     console.log('Response: ' + info);
  //   }
  // })
  // res.end()
})

app.listen(port, function () {
  console.log('App running at http://localhost:' + port)
})

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
