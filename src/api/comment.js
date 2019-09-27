import { createAPI } from '@/utils/request'

/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-26 21:26:25
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-26 21:53:46
 * 评论相关接口
 */
/**
 *  获取评论列表数据接口
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
/**
 *  添加评论接口
 * @param {object} data =>body参数
 * {
 *  target:评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）;必须
 *  content：评论内容；必须
 *  art_id：文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * }
 */
export const addArticleComment = data =>
  createAPI('/app/v1_0/comments', 'post', data)
