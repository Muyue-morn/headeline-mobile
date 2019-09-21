/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-21 19:42:07
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-21 19:51:16
 * 处理时间的各种函数方法
 */

import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 按需加载语言包

dayjs.extend(rTime) // 使用相对时间模块
dayjs.locale('zh-cn')// 使用语言包
/**
 * 返回一个相对于参数时间的时间长度
 * @param {string} time =>时间
 * @return {string} relativeTime相对时间长度
 */
export const relativeTime = (time) => {
  return dayjs().to(dayjs(time))
}
