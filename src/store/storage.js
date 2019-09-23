/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 20:21:00
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-23 15:20:34
 * vuex容器常量存储以及操作本地存储Token函数的文件
 */

/**
  *
  * @param {string} name => 存储数据的字段
  * @param {object} data =>所要存储的数据
  * 存储本地数据信息
  */
export const setItem = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data))
}
/**
 *
 * @param {string} name =>  存储数据的字段
 * 获得本地数据信息
 */
export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(name))
}
/**
 *
 * @param {string} name => 存储数据的字段
 * 移除本地数据信息
 */
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
