const autoPages = (pages) => {
    var ps = {}
    pages.forEach(page => {
        ps[page] = {
            entry: 'src/' + page + '/index.js',
            chunks: []
        }
        ps[page + '_frame'] = {
            entry: 'src/' + page + '/main.js',
            template: 'public/frame.html'
        }
    })
    return ps
}

const autoTabs = (tabs) => {
    var ps = {}
    tabs.forEach(page => {
        ps['tab_' + page] = {
            entry: 'src/tab_' + page + '/main.js',
            template: 'public/frame.html'
        }
    })
    return ps
}

module.exports = {
    autoPages,
    autoTabs
}