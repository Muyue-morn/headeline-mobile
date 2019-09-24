/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-24 14:21:12
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-24 19:12:05
 * 搜索接口
 */
import { createAPI } from '@/utils/request'

/**
 * 获取联想建议以便搜索
 * @param {object:q(string)} params =>query参数 参数名字为q 是字符串类型
 * q: 请求的前缀词句
 */
export const getSearchSuggestion = params =>
  createAPI('/app/v1_0/suggestion', 'get', params)
/**
 * 获取搜索结果接口
 * @param {object} params =>query参数
 * {
 *  page:页数，不传默认为1,
 *  per_page: 每页数量，不传每页数量由后端决定
 *  q:搜索关键词(必须传)
 * }
 */
export const getSearchResults = params =>
  createAPI('/app/v1_0/search', 'get', params)
