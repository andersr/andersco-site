$(function () {
  'use strict'
  var $alert = $('#alert')
  var $alertMessage = $alert.find('.message')
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
    honeypot: {
      el: $('#mainEmail')
    },
    submit: $('#submitButton'),
    alerts: $('#alerts')
  }
  var MESSAGES = {
    errors: {
      'name': 'Please enter a name.',
      'email': 'Please enter a valid email.',
      'message': 'Please enter a message.'
    },
    confirmation: 'Thank you for contacting me!',
    sendError: 'Sorry, there was a problem sending this message. Try again?'
  }

  function displayFlashMessage(msg) {
    var showAlertDuration = 2250
    var animationSpeed = 250

    var hideAlert = function () { $alert.hide() }

    var animateUp = function () {
      $alert.delay(showAlertDuration).animate({
        top: '-=90',
        opacity: '0'
      }, animationSpeed, hideAlert)
    }

    $alertMessage.text(msg)
    $alert.show()
    $alert.animate({
      top: '+=90',
      opacity: '1'
    }, animationSpeed, animateUp)
  }

  function errorClass(name) { return '.' + name + '-error' }
  function inputIsEmpty(el) { return utils.isEmpty($(el).val()) }
  function emailIsInvalid(el) { return !utils.isEmail($(el).val()) }

  function handleKeyup() {
    if ($contactForm[this.name].wasInvalid) {
      if ((this.name === 'email' && !emailIsInvalid(this)) || !inputIsEmpty(this)) {
        $(errorClass(this.name)).hide()
      }
    }
  }

  function handleBlur() {
    if ((this.name === 'email' && emailIsInvalid(this)) || inputIsEmpty(this)) {
      $contactForm[this.name].wasInvalid = true
      showErrorMessage(this)
    }
  }

  function showErrorMessage(el) {
    $(errorClass(el.name)).text(MESSAGES.errors[el.name]).show()
  }

  function postData(data, options, handleResponse) {
    $.post({
      url: options.url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        // console.log('response: ', response);
        handleResponse(response)
      },
      // fail: function (response) {
      //   console.log('FAIL: ', response);
      // },
    })
      // .done(function () {
      //   console.log("success");

      // })
      .fail(function () {
        handleResponse({
          messageSent: false
        })
      })
    // .always(function () {
    //   console.log("finished");

    // })
  }

  function displayErrors(errors) {
    for (var i = 0; i < errors.length; i++) {
      $contactForm[errors[i]].error.text(MESSAGES.errors[errors[i]]).show()
    }
  }

  function resetForm(cb) {
    $.each([
      $contactForm.name,
      $contactForm.email,
      $contactForm.message,
      $contactForm.honeypot
    ],
      function (i, element) {
        element.el.val('')
        if (element.wasInvalid) {
          element.wasInvalid = false
        }
      })
    cb()
  }
  function handleSubmit(e) {
    e.preventDefault()
    $contactForm.submit.attr('disabled', 'disabled').text('Sending...')

    var data = {
      name: $contactForm.name.el.val(),
      email: $contactForm.email.el.val(),
      message: $contactForm.message.el.val(),
      honeypot: $contactForm.honeypot.el.val()
    }
    var options = {
      url: '/mail'
    }
    postData(data, options, function (response) {
      // console.log('response: ', response);
      if (response.messageSent === false) {
        displayFlashMessage(MESSAGES.sendError)
        $contactForm.submit.removeAttr('disabled', 'disabled').text('Send')
      } else if (response.errors.length > 0) {
        displayErrors(response.errors)
        $contactForm.submit.text('Send')
      } else {
        resetForm(function () {
          $contactForm.submit.attr('disabled', 'disabled').text('Send')
          displayFlashMessage(MESSAGES.confirmation)
        })
      }
    })
  }

  $contactForm.submit.on('click', handleSubmit)

  $.each(
    [$contactForm.name.el, $contactForm.email.el, $contactForm.message.el],
    function (i, el) {
      el.on('blur', handleBlur)
      el.on('keyup', handleKeyup)
    })
})
