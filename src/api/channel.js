/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 21:13:08
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-23 14:59:45
 * 频道相关接口
 */
import { createAPI } from '@/utils/request'
/**
 *
 * @param {null} data =>这个参数不需要是空的
 * 获取所有频道列表数据
 */
export const getAllChannels = data => createAPI('/app/v1_0/channels', 'get', data)
/**
 *
 * @param {null} data =>这个参数不需要是空的
 * 获取用户或者默认频道列表数据
 */
export const getUserOrDefualtChannels = data => createAPI('/app/v1_0/user/channels', 'get', data)
