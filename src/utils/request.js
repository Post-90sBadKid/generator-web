import axios from 'axios'
import { MessageBox, Message } from 'element-ui'



// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  withCredentials: true
})
// service.defaults.withCredentials = true
// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (response.config && response.config.responseType == 'blob') {
      const blob = new Blob([res]);
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob);
      downloadElement.style.display = 'none';
      downloadElement.href = href;
      //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.xxx") 设置的文件名;
      let contentDisposition = response.headers['content-disposition'];
      let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
      let result = patt.exec(contentDisposition);
      let filename = decodeURI(result[1]);
      downloadElement.download = filename; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && res.code !== "200") {
      if (res.code >= 500 || res.code >= "500") {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 1 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
