// src: https://github.com/kevinchisholm/handling-POST-requests-with-express-and-node.js

(function () {

  function handleSubmit(){
    $('#submitButton').click(submitButtonHandler)
  }

  function submitButtonHandler (evt) {
      evt.preventDefault()
      var data = {}
					data.name = $('#name').val()
					data.email =  $('#email').val()
          data.message =  $('#message').val()

      //make the AJAX call
      $.post({
        url: '/mail',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          console.log('success')
          // console.log(JSON.stringify(data))
        }
      })
      .fail(function() {
       console.log('jquery post error')
      })
  }

//init on document ready
$(document).ready(handleSubmit)
})()

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
