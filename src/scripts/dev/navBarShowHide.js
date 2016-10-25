(function () {
  $(function () {
    'use strict'

  var $navBar = $('.navbar')
  var $headerNav = $('.header-nav')
  var $welcomeMsg = $('#welcome-msg')
  var $welcomeNav = $('#welcome-nav')
  var navbarHeight = $navBar.outerHeight()

  $(window).scroll(function() {
    var scrollPosition = $(window).scrollTop()
    var welcomeMsgLocation = ($welcomeMsg.offset().top - scrollPosition)
    var welcomeNavLocation = ($welcomeNav.offset().top - scrollPosition) + 25

    if (welcomeMsgLocation < navbarHeight) {
     $navBar.addClass('drop-shadow')
    }
    else {
      $navBar.removeClass('drop-shadow')
    }
      if (welcomeNavLocation < navbarHeight) {
       $headerNav.show()
      }
      else {
        $headerNav.hide()
      }
    })
  })
})()
