import axios from 'axios'
import JsonBigInt from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

export const createAPI = (url, method, data) => {
  let config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  config.transformRequest = [
    function (data) {
      try {
        return JsonBigInt.parse(data)
      } catch (e) {
        return data
      }
    }
  ]
  return request({
    url,
    method,
    ...config
  })
}
