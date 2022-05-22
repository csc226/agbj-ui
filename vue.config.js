const { defineConfig } = require('@vue/cli-service')
const { getComponentEntries } = require('./build/utils.js')
const pub = require('./build/config.pub')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  outputDir: resolve('lib'),
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages/components')
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
      library: 'agbj-ui',
    },
    resolve: pub.resolve,
  },
  css: {
    // sourceMap: true,
    // extract: {
    //   path:path.resolve(__dirname,'./css'),
    //   filename: 'index.css'
    // }
    extract:false
  },
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')
    config.module
      .rule("js")
      .include.add(resolve('packages'))
      .end()
      .use("babel").loader("babel-loader")
      .tap(options => {
        return options;
      })
  }
})
