import httpConfig from "./httpConfig";


function get(url, param) {
  return httpConfig.get(url, {
    params: param
  })
}

function post(url, param) {
  return httpConfig.post(url, param)
}

function put(url, param) {
  return httpConfig.put(url, param)
}

function deletes(url, param) {
  return httpConfig.delete(url, {
    data: param
  })
}

export default {
  get,
  post,
  put,
  delete: deletes
}
