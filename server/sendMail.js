const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const MAILGUN_QUEUED = 'queued'
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth))

module.exports = function sendMail(data, result) {
  let messageSent = false
  nodemailerMailgun.sendMail({
    from: data.email,
    to: process.env.MAILGUN_SEND_TO,
    subject: '[andersco new] Message from ' + data.name,
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
