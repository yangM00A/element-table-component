import axios from "axios";

const devUrl = 'http://localhost:8888/prod-api/admin';
const prodUrl = 'http://172.17.24.73:81/prod-api/admin';

const config = {
  baseURL: process.env.NODE_ENV === 'development' ? devUrl : prodUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf8"
  }
}
const http = axios.create(config)

// 请求拦截
http.interceptors.request.use(requestConfig => {
  // console.log("request", requestConfig)
  return requestConfig
}, err => {
  // console.log("request-err", err);
  return new Promise.reject(err)

})

// 响应拦截
http.interceptors.response.use(response => {
  // console.log("response", response);
  if (response.data.code != 200) {
    // alert(response.data.msg)
    // this.$message.error('错了哦，这是一条错误消息');
  }

  // 处理响应结果并返回
  return response.data
}, err => {
  // console.log("response-err", err);
  // 返回错误对象
  return new Promise.reject(err)
})


export default http
