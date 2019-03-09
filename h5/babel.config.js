module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@nutui/babel-plugin-separate-import', {
      'style': 'css'
    }],
    [
      'import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
}
