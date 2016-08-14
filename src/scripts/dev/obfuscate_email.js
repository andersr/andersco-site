/*! Email obfuscator script 2.1 by Tim Williams, Andrew Moulden, converted to jquery, ttp://www.jottings.com/obfuscator/ */

$(function() {

	'use strict';

  var andersco = {
  	id: "#andersco-mailto",
  	coded:  "ca@XrLnqI.pN",
  	key:  "wmS20BDlarV8QdAMbC1jXqUgHLzhfvRts7KG3ZWcx5EoIOkeP4Tp6FuNYJin9y"
  };

  function obfuscateEmail(options){

  	var 
     shift=options.coded.length,
     address="",
     mailto,
     ltr,
     $link = $(options.id)
   ;

   for (var i=0; i<options.coded.length; i++) {
	    if (options.key.indexOf(options.coded.charAt(i))==-1) {
	      ltr = options.coded.charAt(i)
	      address += (ltr)
	    }
	    else {     
	      ltr = (options.key.indexOf(options.coded.charAt(i))-shift+options.key.length) % options.key.length
	      address += (options.key.charAt(ltr))
	    }
	  }

    mailto = "mailto:"+address;

    $link = $(options.id);
    $link.attr('href',mailto).text(address);

  }

  obfuscateEmail(andersco);

});
