const {
  autoPages,
  autoTabs
} = require('./build/page.config')
const isDev = process.env.NODE_ENV === 'development'

const pages = {
  ...autoPages([]),
  ...autoTabs(['map', 'leader', 'my']),
  ...autoTabs(['survey', 'accept', 'dispose', 'supervision'])
}
pages['tab_leader'].chunks = ['chunk-vendors', 'vue-router', 'tab_leader']

module.exports = {
  publicPath: isDev ? '/' : './',
  productionSourceMap: isDev,
  pages,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          echarts: { // 将echarts|zrender|vue-echarts合成一个chunk
            test: /[\\/]node_modules[\\/](echarts|zrender|vue-echarts)[\\/]/,
            name: 'echarts',
            chunks: 'all'
          },
          'vue-router': {
            test: /[\\/]node_modules[\\/](vue-router)[\\/]/,
            name: 'vue-router',
            chunks: 'all'
          }
        }
      }
    }
  }
}
