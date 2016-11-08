const emailValidator = require('email-validator')
const isEmpty = str => str === ''

module.exports = function validateMail (data) {
  const errors = []
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
