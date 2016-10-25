(function () {
  $(function () {
    'use strict'

    var $navBar = $('.navbar')

     $(window).scroll(function() {
         var scroll = $(window).scrollTop()
         if (scroll > 0) {
          $navBar.addClass('drop-shadow')
         }
         else {
            $navBar.removeClass('drop-shadow')
         }
     })
 })
})()
