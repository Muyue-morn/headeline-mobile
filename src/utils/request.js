/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-18 16:20:37
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-20 21:21:30
 * 请求函数封装
 */

import axios from 'axios'
import JsonBigInt from 'json-bigint'
import store from '@/store'
/**
 * 克隆一个axios,并设置基础请求Url
 */
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  /**
 * 处理超出安全数字范围的大型数字
 */
  transformResponse: [function (data) {
    try {
      // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
      return JsonBigInt.parse(data)
    } catch (err) {
      // 无法转换的数据直接原样返回
      return data
    }
  }],
  headers: { 'Authorization': `Bearer ${store.state.user.token}` }
})

/**
 *
 * @param {string} url
 * @param {string} method
 * @param {object} data:{prarms Or data}
 * 创建接口函数
 */

export const createAPI = (url, method, data) => {
  let config = {}
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
