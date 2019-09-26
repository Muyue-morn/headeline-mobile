import { createAPI } from '@/utils/request'

/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-26 19:32:31
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-26 19:46:49
 * 文章详情相关接口
 */
/**
 * 获取文章详情的接口
 * @param {string} articleId =>文章id
 */
export const getArticleDetial = articleId =>
  createAPI(`/app/v1_0/articles/${articleId}`, 'get')
