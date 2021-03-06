const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
  },
  devServer: {
    // port: 8080, //设置项目端口号
    // host: "0.0.0.0", //允许所有的主机访问当前项目
    proxy: {
      '/api': {
        //正则匹配到以这个开头的时候 就用代理
        target: "http://www.chst.vip",
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  }
};
