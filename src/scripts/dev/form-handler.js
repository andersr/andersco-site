(function () {
$(function () {
  'use strict'
  var $flashMessage = $('.flash-message')
  // var scrollPosition = $(document).scrollTop()
  // var $formInputs = $(".form :input")
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
      'name': 'Please enter a name',
      'email': 'Please enter a valid email',
      'message': 'Please enter a message'
    },
    confirmation: 'Thank you for contacting me!',
    sendError: 'Sorry, there was a problem sending this message. Try again?'
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
    // console.log('form inputs: ', $formInputs)
    //
    // $formInputs.each(function(){
    //   $(this).is(':focus') //<-- Should return all input elements in that specific form.
    // });
    //
    // // if($formInputs.not(":focus")){
    // //   $(document).scrollTop(scrollPosition)
    // // }

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
      //  console.log('post data response: ', response)
        handleResponse(response)
      }
    })
    .fail(function () {
      // console.log('post data error')
      var response = {
        messageSent: false
      }
      handleResponse(response)
    })
  }

  function displayErrors (errors) {
    for(var i = 0; i < errors.length; i++) {
      $contactForm[errors[i]].error.text(MESSAGES.errors[errors[i]]).show()
    }
  }

  function disableSubmit () {
     $contactForm.submit.attr('disabled', 'disabled')
  }

  function displayFlashMessage (msg) {
    $flashMessage.text(msg).show()
  }

  function resetForm (cb) {
    $.each([
      $contactForm.name,
      $contactForm.email,
      $contactForm.message,
      $contactForm.honeypot
    ],
      function (i, element) {
        element.el.val('')
        if(element.wasInvalid) {
          element.wasInvalid = false
        }
    })
    cb()
  }
  function handleSubmit (e) {
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
      if (response.messageSent === false) {
        displayFlashMessage(MESSAGES.sendError)
        $contactForm.submit.removeAttr('disabled', 'disabled').text('Send')
        // $(document).scrollTop(scrollPosition)
      } else if(response.errors.length > 0) {
        displayErrors(response.errors)
      } else {
        resetForm(function () {
          $contactForm.submit.attr('disabled', 'disabled').text('Send')
          displayFlashMessage(MESSAGES.confirmation)
          // $(document).scrollTop(scrollPosition)
        })
      }
    })
  }
})
})()

// $contactForm.submit.attr('disabled', 'disabled').text('Send')
// displayFlashMessage(MESSAGES.confirmation)

// var $testBtn = $('#testBtn')
//
// $testBtn.click(function (e) {
//   e.preventDefault()
//   displayFlashMessage('This is much longer tes test Test message')
// })
