const Timestamp = new Date().getTime();

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  chainWebpack: () => {},
  // configureWebpack: () => {},
  configureWebpack: {
    output: {
      filename: `[name].[hash].${Timestamp}.js`,
      chunkFilename: `[name].[hash].${Timestamp}.js`
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8090,
    https: false,
    hotOnly: false,
    // proxy: null, // 设置代理
    before: app => {}
  },
  // // 第三方插件配置
  // pluginOptions: {
  //  // ...
  // }
}
