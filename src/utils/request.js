import axios from 'axios'

// 封装 axios
const request = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default request
