/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 21:55:51
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-20 22:10:18
 * 文章相关接口
 */
import { createAPI } from '@/utils/request'
/**
 *
 * @param {object} data =>parmas{
 * channel_id//频道ID
 * timestamp//时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * with_top//是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
 * }
 * 获取指定频道新闻推荐的数据
 */
export const getAllArticles = data => createAPI('/app/v1_1/articles', 'get', data)
