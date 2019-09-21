/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 20:21:00
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-21 11:57:30
 * vuex容器常量存储以及操作本地存储token函数的文件
 */

/**
  *
  * @param {string} name => 存储数据的字段
  * @param {object} data =>所要存储的数据
  * 存储Token
  */
export const setToken = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data))
}
/**
 *
 * @param {string} name =>  存储数据的字段
 * 获得Token
 */
export const getToken = name => {
  return JSON.parse(window.localStorage.getItem(name))
}
/**
 *
 * @param {string} name => 存储数据的字段
 * 移除Token
 */
export const removeToken = name => {
  window.localStorage.removeItem(name)
}
