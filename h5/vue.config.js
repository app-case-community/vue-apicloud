const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const isDev = process.env.NODE_ENV === 'development'
const { PackerAppPlugin } = require('./build/plugins')

module.exports = {
  publicPath: isDev ? '/' : './',
  productionSourceMap: isDev,
  pages: require('./pages.config'),
  chainWebpack: (config) => {
    config.resolve.alias
      .set('~', resolve('src'))
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    plugins: [].concat(isDev ? [] : [
      new PackerAppPlugin({
        appid: 'VueApicloud',
        type: 'apicloud',
        rootDir: resolve('.'),
        originDir: resolve('dist'),
        distDirs: {
          android: resolve('./../android/app/src/main/assets/widget'),
          ios: resolve('./../ios/app/widget')
        }
      })
    ]),
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
