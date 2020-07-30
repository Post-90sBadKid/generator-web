const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {     //这里是公共部分，在调用接口时后面接不相同的部分，/api就相当于http://192.168.0.199:8926/api这一段
        target: 'http://localhost:8011',   //这里写的是访问接口的域名和端口号
        changeOrigin: true, // 必须加上这个才能跨域请求
        pathRewrite: {  // 重命名
          '^/api': '/'
        }
      }
    },
  },
  lintOnSave: false, //直接关闭eslint检查
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
}
