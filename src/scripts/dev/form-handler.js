(function ($) {
  'use strict'
  var $contactForm
  var MESSAGES = {
    errors: {
      'name': 'Please enter a name',
      'email': 'Please enter a valid email',
      'message': 'Please enter a message'
    },
    confirmation: 'Thank you for contacting me!'
  }

  $(function () {
    $contactForm = {
      form: $('#contactForm'),
      name: $('#name'),
      email: $('#email'),
      message: $('#message'),
      submit: $('#submitButton'),
      alerts: $('#alerts')
    }
    $contactForm.submit.on('click', handleSubmit)
  })

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
      $contactForm[errors[i]].after(MESSAGES.errors[errors[i]])
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    var data = {
      name: $contactForm.name.val(),
      email: $contactForm.email.val(),
      message: $contactForm.message.val()
    }
    var options = {
      url: '/mail'
    }
    // display 'sending msg' w/timeout
    //   var result =
    postData(data, options, function (response) {
      // console.log('response: ', response)
      if (response.errors.length > 0) {
        displayErrors(response.errors)
      } else {
        // console.log('response.messageSent: ', response.messageSent)
        $contactForm.name.val('')
        $contactForm.email.val('')
        $contactForm.message.val('')
        $contactForm.alerts.text(MESSAGES.confirmation)
        setTimeout(function () {
          $contactForm.alerts.empty()
        }, 5000)
      }
    })
  }
})(jQuery)
// evt.stopPropagation()

// $('#post-results-container').fadeOut()
// $('.ajaxLoader').css('display', 'inline-block')
// var $name = $('#name').val()
// var $email = $('#email').val()
// var $email = $('#email').val()
//
// console.log('name: ', $name )

// var $data = $('#post-results-container .data')
//
// //reset the UI
// $data.html('')
// $('.ajaxLoader').hide()

//update the UI with the data returned from the AJAX call
// $.each(jsonData, function (key, val) {
//   console.log(key, ':', val)
//   // $data.append('<li><b>' +  key + '</b>'   + val + '</li>')
// })

// $('#post-results-container').fadeIn()
