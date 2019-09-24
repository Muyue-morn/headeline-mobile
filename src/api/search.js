/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-24 14:21:12
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-24 14:26:24
 * 搜索接口
 */
import { createAPI } from '@/utils/request'

/**
 * 获取联想建议以便搜索
 * @param {object:q(string)} params =>query参数 参数名字为q 是字符串类型
 * q: 请求的前缀词句
 */
export const getSearchSuggestion = params => createAPI('/app/v1_0/suggestion', 'get', params)
