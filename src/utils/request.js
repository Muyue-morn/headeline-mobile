/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-18 16:20:37
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-23 15:56:03
 * 请求函数封装
 */

import axios from 'axios'
import JsonBigInt from 'json-bigint'
import store from '@/store'
/**
 * 克隆一个axios,并设置基础请求Url
 */
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
/**
 * 使用拦截器而不是使用create中的属性来设置是因为
 * 在create中的属性不会实时更新处理，只有在第一次调用的时候才会实例化，其中复杂的处
 * 理以及变量数据最好写在拦截其中，create中最好只写死数据不会变化的数据
 */
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user) {
    config.headers = { 'Authorization': `Bearer ${store.state.user.token}` }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/**
* 处理超出安全数字范围的大型数字
*/
request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JsonBigInt.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
/**
 *
 * @param {string} url
 * @param {string} method
 * @param {object} data:{prarms Or data}
 * 创建接口函数
 */

export const createAPI = (url, method, data) => {
  // console.log(store.state.user)
  let config = {}
  // 如果没有传递参数则把data设置为null而不是默认的undefined
  // data = data || null
  // console.log(data)
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  /**
   * 设置请求参数收返回给调用函数相应的请求
   */
  return request({
    url,
    method,
    ...config
  })
}
