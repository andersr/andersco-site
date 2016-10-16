/*! Email obfuscator script 2.1 by Tim Williams, Andrew Moulden, converted to jquery, http://www.jottings.com/obfuscator/ */

$(function () {
  'use strict'

  const config = {
    id: '#andersco-mailto',
    coded: 'ca@XrLnqI.pN',
    key: 'wmS20BDlarV8QdAMbC1jXqUgHLzhfvRts7KG3ZWcx5EoIOkeP4Tp6FuNYJin9y'
  }

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

  function createEmailLink (options) {
    var
      address = getEmailAddress(options),
      linkText = options.linkText || address,
      $link = $(options.id),
      mailto = 'mailto:' + address

    $link.attr('href', mailto).text(linkText)
  }

  createEmailLink(config)
})
