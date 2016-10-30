var nodemailer = require('nodemailer')
var mailgun = require('nodemailer-mailgun-transport')
var MAILGUN_QUEUED = 'queued'
var config = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
}
// console.log('mailgun config: ', config)

var nodemailerMailgun = nodemailer.createTransport(mailgun(config))

module.exports = function sendMail (data, result) {
  var messageSent = false
  nodemailerMailgun.sendMail({
    from: data.email,
    to: process.env.MAILGUN_SEND_TO,
    subject: 'Message from ' + data.name,
    text: data.message
  }, function (err, info) {
    if (err) {
      console.log('Mailgun error: ' + err)
      result(messageSent)
    } else {
      messageSent = info.message.toLowerCase().indexOf(MAILGUN_QUEUED) >= 0
      result(messageSent)
    }
  })
}
