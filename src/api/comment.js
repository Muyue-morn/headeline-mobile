import { createAPI } from '@/utils/request'

/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-26 21:26:25
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-26 21:29:14
 * 评论相关接口
 */
/**
 *
 * @param {object} params =>query参数
 * {
 *  type:评论类型，a-对文章(article)的评论，c-对评论(comment)的回复;必须
 *  source：源id，文章id或评论id；必须
 *  offset：获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 *  limit：获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * }
 */
export const getArticleComments = params =>
  createAPI('/app/v1_0/comments', 'get', params)
