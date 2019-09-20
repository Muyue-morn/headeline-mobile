/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 21:13:08
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-20 21:35:35
 * 频道相关接口
 */
import { createAPI } from '@/utils/request'
/**
 *
 * @param {null} data =>这个参数不需要是空的
 * 获取频道列表数据
 */
export const getChannels = data => createAPI('/app/v1_0/channels', 'get', data)
