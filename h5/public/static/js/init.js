(function (window) {
  window.$init = function (fn) {
    window.apiready = function () {
      document.dispatchEvent(new MessageEvent('apiready', {
        data: {}
      }))
      fn && fn()
    }
  }
  window.$updateOrientation = function (fn) {
    var update = function () {
      setTimeout(function () {
        document.dispatchEvent(new MessageEvent('updateOrientation', {
          data: {}
        }))
        fn && fn()
      }, 200)
    }
    window.addEventListener('orientationchange', update, false)
    window.addEventListener('resize', update, false)
  }
})(window)
