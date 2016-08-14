//! Email obfuscator script 2.1 by Tim Williams, University of Arizona
//! Random encryption key feature by Andrew Moulden, Site Engineering Ltd
//! This code is freeware provided these four comment lines remain intact
//! A wizard to generate this code is at http://www.jottings.com/obfuscator/
{ var
    coded = "ca@XrLnqI.pN",
    key = "wmS20BDlarV8QdAMbC1jXqUgHLzhfvRts7KG3ZWcx5EoIOkeP4Tp6FuNYJin9y",
    shift=coded.length,
    node = document.getElementById("anderco-contact"),
    a = document.createElement("a")
    link=""
  ;

  for (i=0; i<coded.length; i++) {
    if (key.indexOf(coded.charAt(i))==-1) {
      ltr = coded.charAt(i)
      link += (ltr)
    }
    else {     
      ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
      link += (key.charAt(ltr))
    }
  }
  var linkText = document.createTextNode(link);
  var mailToLink = "mailto:"+link;
  a.appendChild(linkText);
  a.href = mailToLink;

document.write("<a href='mailto:"+link+"'>"+link+"</a>")
}