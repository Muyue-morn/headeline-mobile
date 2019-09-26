import { createAPI } from '@/utils/request'

/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-26 19:32:31
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-26 20:33:14
 * 文章详情相关接口
 */
/**
 * 获取文章详情的接口
 * @param {string} articleId =>文章id
 */
export const getArticleDetial = articleId =>
  createAPI(`/app/v1_0/articles/${articleId}`, 'get')
/**
 * 关注用户
 * @param {object} data =>
 * {
 *  target:number 关注目标（被关注的用户id）
 * }
 */
export const followUser = data =>
  createAPI('/app/v1_0/user/followings', 'post', data)
/**
 * 取消关注用户
 * @param {number} id 用户id
 */
export const unFollowUser = id =>
  createAPI(`/app/v1_0/user/followings/${id}`, 'delete')
