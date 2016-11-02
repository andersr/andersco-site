var utils = {
  isEmpty: function (str) {
    return str.trim().length === 0
  },
  isEmail: function (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return regex.test(email)
  }
}
