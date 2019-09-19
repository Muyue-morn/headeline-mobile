/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-18 19:29:13
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-19 15:56:57
 * 和用户相关的接口
 */
import { createAPI } from '@/utils/request' // 导入创建接口的函数

/**
 *
 * @param {object} data: {mobile,code}
 * 登录验证请求
 */
export const loginUp = data => createAPI('/app/v1_0/authorizations', 'post', data)
