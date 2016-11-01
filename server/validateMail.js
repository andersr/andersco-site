var emailValidator = require("email-validator")

function isEmpty (str) {
  return str === ''
}

module.exports = function validateMail (data) {
  var errors = []
  if(isEmpty(data.name)) {
    errors.push('name')
  }
  if(isEmpty(data.message)) {
    errors.push('message')
  }
  if(isEmpty(data.email) || !emailValidator.validate(data.email)) {
    errors.push('email')
  }
  return errors
}
