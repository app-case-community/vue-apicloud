const fs = require('fs-extra')
const path = require('path')
const autoPages = (pages) => {
  var ps = {}
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page === undefined) continue
    var entry = `src/${page}/main.js`
    var pageName = page
    var template
    var list = page.split('/')
    if (list[0] === 'pages') {
      list = list.slice(1)
    }
    if (list[1] === undefined || list[1] === '') {
      pageName = `${list[0]}_index`
      template = `public/${list[0]}.index.html`
    } else {
      pageName = ''
      list.forEach(it => {
        if (it !== 'pages') {
          if (pageName === '') {
            pageName = it.concat('_')
          } else {
            pageName = pageName.concat(it).concat('_')
          }
        }
      })
      pageName = pageName.substring(0, pageName.length - 1)
      template = `public/${list[0]}.html`
    }
    const templateFile = path.resolve(__dirname, template)
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

const pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html'
  },
  ...autoPages(['pages/tab/kanban', 'pages/tab/map', 'pages/tab/leader', 'pages/tab/my']),
  ...autoPages(['pages/tab/survey', 'pages/tab/accept', 'pages/tab/dispose', 'pages/tab/supervision']),
  ...autoPages(['pages/login'])
}
pages['tab_leader'].chunks = ['chunk-vendors', 'vue-router', 'tab_leader']

module.exports = pages
