import axios from 'axios'
// const qs = require('qs')
// axios.defaults.paramsSerializer = params => {
//   return qs.stringify(params, { arrayFormat: 'repeat' })
// }
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const instance = axios.create({
  baseURL: 'http://http://114.116.86.37:3000',
  timeout: 6000,
  withCredentials: true
});
instance.interceptors.request.use(function (config) {
  return config
},function (error) {
  Promise.reject(error)
})
instance.interceptors.response.use(function (response) {
  console.log(response)
  if (response.data.success) {
    return response.data
  } else {
    let error = new Error()
    if (response.data.message) {
      error.message = response.data.message
    } else {
      error.message = response.status + '服务器内部异常'
    }
    error.response = response.data
    throw error
  }
}, function (error) {
  Promise.reject(error)
  if (!error.response) {
    error.message = '请检查网络设置'
    console.log(error)
    return Promise.reject(error)
  }
  switch (error.response.status) {
    case 101:
      break
    case 401:
      error.message = '登录已过期,请重新登录!'
      ShortcutMgr.logout()
      break
    case 403:
      error.message = '禁止访问!'
      break
    case 503:
      error.message = '服务器升级中!'
      break
    case 500:
      error.message = '服务内部异常!'
      break
    default:
      error.message = '未知错误'
  }
  return Promise.reject(error)
})
export default instance
