// disable submit unless required fields have values
(function (){

  function handleDisableSubmit () {
    var total_required_fields = 0
    var $submitBtn = $('.handle-disable-submit input[type="submit"], .handle-disable-submit button[type="submit"]')

    var isEmpty = function(el){
      return el.val().trim().length === 0
    }

    $('.required_field').each(function () {
       total_required_fields += 1
       if(isEmpty($(this))){
         $submitBtn.attr('disabled', 'disabled')
       } else {
         $submitBtn.removeAttr('disabled')
       }
    })

    $('.required_field').keyup(function () {
      var filled_required_fields = 0

      $('.required_field').each(function () {
         if(!isEmpty($(this))){
          filled_required_fields += 1
         }
         if(filled_required_fields === total_required_fields) {
           $submitBtn.removeAttr('disabled')
         } else {
            $submitBtn.attr('disabled', 'disabled')
         }
      })
    })
  }

$(document).ready(handleDisableSubmit)
})()
