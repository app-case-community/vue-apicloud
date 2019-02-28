(function (window) {
  var vendor = (() => {
    /* istanbul ignore if */
    // if (!inBrowser) {
    //   return false
    // }
    let elementStyle = document.createElement('div').style
    let transformNames = {
      standard: 'transform',
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform'
    }

    for (let key in transformNames) {
      if (elementStyle[transformNames[key]] !== undefined) {
        return key
      }
    }

    /* istanbul ignore next */
    return false
  })()
  var tab = {}
  tab.prefixStyle = function (style) {
    /* istanbul ignore if */
    if (vendor === false) {
      return false
    }

    if (vendor === 'standard') {
      if (style === 'transitionEnd') {
        return 'transitionend'
      }
      return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
  }
  window.$tab = tab
})(window)
