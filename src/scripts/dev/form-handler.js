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

  // Events
  $contactForm.submit.on('click', handleSubmit)
  $.each(
    [$contactForm.name.el, $contactForm.email.el, $contactForm.message.el],
    function (i, el) {
      el.on('blur', handleBlur)
      el.on('keyup', handleKeyup)
  })

  function errorClass (name) { return '.' + name + '-error' }
  function inputIsEmpty (el) { return utils.isEmpty($(el).val()) }
  function emailIsInvalid (el) { return !utils.isEmail($(el).val()) }

  function handleKeyup () {
    if ($contactForm[this.name].wasInvalid) {
      if((this.name === 'email' && !emailIsInvalid(this)) || !inputIsEmpty(this)) {
        $(errorClass(this.name)).hide()
      }
    }
  }

  function handleBlur () {
    if((this.name === 'email' && emailIsInvalid(this)) || inputIsEmpty(this)) {
      $contactForm[this.name].wasInvalid = true
      showErrorMessage(this)
    }
  }

  function showErrorMessage (el) {
    $(errorClass(el.name)).text(MESSAGES.errors[el.name]).show()
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
