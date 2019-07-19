const webpack = require('webpack');

module.exports = {
  // webpack-dev-server 相关配置
  devServer: { // 设置代理
    hot: true, // 热加载
    host: 'localhost', //ip地址
    port: 3100, //端口
    https: false, // false关闭https，true为开启
    open: false, // 自动打开浏览器
    // proxy: {
    //   '/api': { //本地                                        
    //     target: 'localhost:3100',
    //     // 如果要代理 websockets
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
};