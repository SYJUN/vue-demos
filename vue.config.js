const webpack = require('webpack');

module.exports = {
  // 此处配置文件打包的相对路径，默认情况下为 '/'，如果在生产环境有变动，可指定路径
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 生产构建时禁用 eslint-loader
  lintOnSave: process.env.NODE_ENV !== "production",
  // webpack-dev-server 相关配置
  devServer: {
    // 设置代理
    hot: true, // 热加载
    host: "localhost", //ip地址
    port: 3100, //端口
    https: false, // false关闭https，true为开启
    open: false, // 自动打开浏览器
    proxy: {
      "/api": {
        //本地
        target: "http://cache.video.iqiyi.com/",
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};