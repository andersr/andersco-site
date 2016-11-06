//Initialize nav menu
var slideRight = new Menu({
  wrapper: '.nav-menu-container',
  type: 'slide-right',
  menuOpenerClass: '.c-button',
  maskId: '#mask'
})

//Initialize nav button
var slideRightBtn = document.querySelector('#c-button--slide-right')
slideRightBtn.addEventListener('click', function(e) {
  e.preventDefault
  slideRight.open()
})


$(function() {
   FastClick.attach(document.body)
   handleDisableSubmit()
})

/*! Email obfuscator, based on the script 2.1 by Tim Williams, Andrew Moulden http://www.jottings.com/obfuscator/ */
$(function() {
'use strict'

 function getEmailAddress (options) {
   var
     shift = options.coded.length,
     address = '',
     ltr

   for (var i = 0; i < options.coded.length; i++) {
     if (options.key.indexOf(options.coded.charAt(i)) === -1) {
       ltr = options.coded.charAt(i)
       address += (ltr)
     } else {
       ltr = (options.key.indexOf(options.coded.charAt(i)) - shift + options.key.length) % options.key.length
       address += (options.key.charAt(ltr))
     }
   }
   return address
 }

 function createObfuscatedEmailLink (options) {
   var
     address = getEmailAddress(options),
     linkText = options.linkText || address,
     $link = $(options.id),
     mailto = 'mailto:' + address

   $link.attr('href', mailto).text(linkText)
 }

 createObfuscatedEmailLink({
   id: '#andersco-mailto',
   coded: 'ca@XrLnqI.pN',
   key: 'wmS20BDlarV8QdAMbC1jXqUgHLzhfvRts7KG3ZWcx5EoIOkeP4Tp6FuNYJin9y'
 })
})

//Initialize smoothScroll
smoothScroll.init()
