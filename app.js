require('dotenv').config()
var path = require('path')
var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var env = process.env.NODE_ENV

if (env === 'staging') {
  var basicAuth = require('basic-auth-connect')
  app.use(basicAuth(process.env.NPM_CONFIG_BASIC_AUTH_USER, process.env.NPM_CONFIG_BASIC_AUTH_PWD))
}


// FORMS
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true
}))


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

app.post('/mail', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  console.log('body: ', req.body)
  nodemailerMailgun.sendMail({
    from: req.body.email,
    to: process.env.MAILGUN_SEND_TO,
    subject: 'Message from ' + req.body.name ,
    text: req.body.message
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  })
  res.end()
})


app.get('/', function (req, res) {
  res.render('index')
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
