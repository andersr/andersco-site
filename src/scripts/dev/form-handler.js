(function () {
$(function () {
  'use strict'
  var $contactForm = {
    form: $('#contactForm'),
    name: {
      el: $('#name'),
      error: $('.name-error'),
      wasInvalid: false
    },
    email: {
      el: $('#email'),
      error: $('.email-error'),
      wasInvalid: false
    },
    message: {
      el: $('#message'),
      error: $('.message-error'),
      wasInvalid: false
    },
    submit: $('#submitButton'),
    alerts: $('#alerts')
  }

  var MESSAGES = {
    errors: {
      'name': 'Please enter a name',
      'email': 'Please enter a valid email',
      'message': 'Please enter a message'
    },
    confirmation: 'Thank you for contacting me!'
  }

  //EVENTS
  $contactForm.submit.on('click', handleSubmit)
  $contactForm.name.el.on('blur', handleBlur)
  $contactForm.name.el.on('keyup', handleKeyup)
  $contactForm.email.el.on('blur', handleBlur)
  $contactForm.email.el.on('keyup', handleKeyup)
  $contactForm.message.el.on('blur', handleBlur)
  $contactForm.message.el.on('keyup', handleKeyup)

  function errorClass(name){
    return '.' + name + '-error'
  }

  function handleKeyup () {
    if ($contactForm[this.name].wasInvalid && $(this).val().trim().length > 0) {
      $(errorClass(this.name)).hide()
    }
  }

  function handleBlur () {
    if(this.name === 'email') {
       validateEmail(this)
    } else {
      validateText(this)
    }
  }

  function validateText (el) {
    var isEmpty = utils.isEmpty($(el).val())
    if(isEmpty){
      $contactForm[el.name].wasInvalid = true
      $(errorClass(el.name)).text(MESSAGES.errors[el.name]).show()
    }
  }
  function validateEmail (el) {
    var validEmail = utils.isEmail($(el).val())
    if(!validEmail) {
      $contactForm[el.name].wasInvalid = true
      $(errorClass(el.name)).text(MESSAGES.errors[el.name]).show()
    }
  }

  function postData (data, options, handleResponse) {
    $.post({
      url: options.url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        handleResponse(response)
      }
    })
    .fail(function () {
      console.log('post data error')
    })
  }

  function displayErrors (errors) {
    for(var i = 0; i < errors.length; i++) {
      $contactForm[errors[i]].error.text(MESSAGES.errors[errors[i]]).show()
      // after(
      //   $errorMessage.text(MESSAGES.errors[errors[i]]))
    }
  }
  function handleSubmit (e) {
    e.preventDefault()
    var data = {
      name: $contactForm.name.el.val(),
      email: $contactForm.email.el.val(),
      message: $contactForm.message.el.val()
    }
    var options = {
      url: '/mail'
    }
    postData(data, options, function (response) {
      if (response.errors.length > 0) {
        displayErrors(response.errors)
      } else {
        $contactForm.name.el.val('')
        $contactForm.email.el.val('')
        $contactForm.message.el.val('')
        $contactForm.alerts.text(MESSAGES.confirmation)
        setTimeout(function () {
          $contactForm.alerts.empty()
        }, 5000)
      }
    })
  }
})
})()
