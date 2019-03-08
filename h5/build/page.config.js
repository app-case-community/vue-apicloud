const fs = require('fs-extra')
const path = require('path')
const autoPages = (pages) => {
  var ps = {}
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page === undefined) continue
    var pageName = page
    var entry = ''
    var template = 'public/index.html'
    if (page === '' || page === 'index') {
      pageName = 'index'
      entry = 'src/main.js'
    } else {
      var list = page.split('/')
      if (list[1] === undefined || list[1] === '') {
        pageName = `${list[0]}_index`
        entry = `src/${list[0]}/main.js`
        template = `public/${list[0]}.index.html`
      } else {
        pageName = `${list[0]}_${list[1]}`
        entry = `src/${page}/main.js`
        template = `public/${list[0]}.html`
      }
    }
    const templateFile = path.resolve(__dirname, `./../${template}`)
    if (!fs.existsSync(templateFile)) {
      template = 'public/index.html'
    }
    ps[pageName] = {
      entry,
      template
    }
  }
  return ps
}

module.exports = {
  autoPages
}
