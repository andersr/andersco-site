
// function extend (a, obj) {
//   for (var key in obj) {
//     //  hasOwnProperty() method returns a boolean indicating whether the object has the specified property.
//     if (obj.hasOwnProperty(key)) {
//       a[key] = b[key]
//     }
//   }
//   return a
// }
// this.options = extend({}, this.options)
// extend(this.options, options)


// var tid = setInterval( function (runWhenReady) {
//     if ( document.readyState !== 'complete' ) return;
//     clearInterval( tid );
//     runWhenReady();
// }, 100 );

  const MENU_NAME = 'nav-menu'

  function Menu () {
    this.menu = MENU_NAME
    this.container = MENU_NAME + '-container'
    this.type = MENU_NAME + '-slide-right'
    this.mask = MENU_NAME + '-mask'
    this.openBtn = MENU_NAME + '-open'
    this.closeBtn = MENU_NAME + '-close'
    this.body = document.body
    // tid(this._initEvents())
    // this._initEvents()
  }

  Menu.prototype._initEvents = () => {
    // click on close button inside menu.
    // this.openBtn.addEventListener('click', e => {
    //   e.preventDefault()
    //   this.open()
    // })
    document.addEventListener("DOMContentLoaded", (event) => {
    //do work
    // click on close button inside menu.
    this.closeBtn.addEventListener('click', event => {
      event.preventDefault()
      this.close()
    })

    // clicks on mask
    this.mask.addEventListener('click', event => {
      event.preventDefault()
      this.close()
    })

  });

  }
  // Menu.prototype.options = {
  //   menu: MENU_NAME,
  //   container: MENU_NAME + '-container',
  //   type: MENU_NAME + '-slide-right',
  //   mask: MENU_NAME + '-mask',
  //   openBtn: MENU_NAME + '-open',
  //   closeBtn: MENU_NAME + '-close'
  // }

  // Menu.prototype._init = function () {
  //   // console.log('doc body: ', document.body)
  //
  //
  //   // this.menu = document.querySelector(this.options.menu)
  //   // this.container = document.querySelector(this.options.container)
  //   // this.mask = document.querySelector(this.options.mask)
  //   // this.openBtn = this.menu.querySelector(this.options.openBtn)
  //   // this.closeBtn = this.menu.querySelector(this.options.closeBtn)
  //   this._initEvents()
  // }




  /**
   * Open Menu.
   */
  Menu.prototype.open = () => {
    console.log('open menu')
    this.body.classList.add('has-active-menu')
    this.container.classList.add('has-' + this.options.type)
    this.menu.classList.add('is-active')
    this.mask.classList.add('is-active')
    // this.disableMenuOpeners();
  }

  //   /**
  //    * Close Menu.
  //    */
  //   // Menu.prototype.close = function() {
  //   //   this.body.classList.remove('has-active-menu');
  //   //   this.wrapper.classList.remove('has-' + this.options.type);
  //   //   this.menu.classList.remove('is-active');
  //   //   this.mask.classList.remove('is-active');
  //   //   this.enableMenuOpeners();
  //   // };
  //
  //   /**
  //    * Disable Menu Openers.
  //    */
  //   // Menu.prototype.disableMenuOpeners = function() {
  //   //   each(this.menuOpeners, function(item) {
  //   //     item.disabled = true;
  //   //   });
  //   // };
  // // })()
