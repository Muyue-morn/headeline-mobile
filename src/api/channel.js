/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 21:13:08
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-23 21:22:53
 * 频道相关接口
 */
import { createAPI } from '@/utils/request'
/**
 *
 * @param {null}  =>这个参数不需要是空的
 * 获取所有频道列表数据
 */
export const getAllChannels = () => createAPI('/app/v1_0/channels', 'get')
/**
 *
 * @param {null}  =>这个参数不需要是空的
 * 获取用户或者默认频道列表数据
 */
export const getUserOrDefualtChannels = () => createAPI('/app/v1_0/user/channels', 'get')

/**
 *
 * @param {object []} data =>用户关注的频道列表
 * item类型:object =>
 * channels:{
 *  id: 频道id
 *  seq: 顺序序号
 * }
 */
export const resetUserChannels = data => createAPI('/app/v1_0/user/channels', 'put', data)

export const deletUserChannels = (target) => createAPI(`/app/v1_0/user/channels/${target}`, 'delete')
