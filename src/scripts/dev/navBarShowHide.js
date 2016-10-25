(function () {
  $(function () {
    'use strict'


    var $navBar = $('.navbar')
    var $headerNav = $('.header-nav')
    var $topContent = $('.top-content')
    var $welcomeNav = $('#welcome-nav')
    var navbarHeight = $navBar.outerHeight()
    var windowWidth = $( window ).width();
    var tabletBreakpoint = 640 // matches $breakpoint-tablet in _variables.scss
    $(window).resize(function() {
      windowWidth = $( window ).width()
      if (windowWidth > tabletBreakpoint) {
       $headerNav.show()
      }
      else {
        $headerNav.hide()
      }
    })

    $(window).scroll(function() {
      var scrollPosition = $(window).scrollTop()
      var welcomeMsgLocation = ($topContent.offset().top - scrollPosition)
      var welcomeNavLocation = ($welcomeNav.offset().top - scrollPosition) + 25 // Why is the additional 25 needed?

      if (welcomeMsgLocation < navbarHeight) {
       $navBar.addClass('drop-shadow')
      }
      else {
        $navBar.removeClass('drop-shadow')
      }

      if (welcomeNavLocation < navbarHeight && windowWidth > tabletBreakpoint) {
       $headerNav.show()
      }
      else {
        $headerNav.hide()
      }
    })
  })
})()
