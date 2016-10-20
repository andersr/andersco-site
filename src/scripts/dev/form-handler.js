(function ($) {
  'use strict'
  var $contactForm
  var MESSAGES = {
    errors: {
      'name': 'Please enter a name',
      'email': 'Please enter a valid email',
      'message': 'Please enter a message'
    }
  }

  $(function () {
    $contactForm = {
      name: $('#name'),
      email: $('#email'),
      message: $('#message'),
      submit: $('#submitButton')
    }
    $contactForm.submit.on('click', handleSubmit)
  })

  function postData (data, options) {
    $.post({
      url: options.url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        // console.log('response: ', response)
        if (response) {
          displayErrors(response)
        }
      }
    })
    .fail(function () {
      console.log('post data error')
    })
  }

  function displayErrors (response) {
    // console.log(response)
    for(var i = 0; i < response.length; i++) {
      $contactForm[response[i]].after(MESSAGES.errors[response[i]])
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
    postData(data, options)
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
