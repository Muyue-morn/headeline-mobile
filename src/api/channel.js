/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-20 21:13:08
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-20 21:15:15
 * 频道相关接口
 */
import { createAPI } from '@/utils/request'
export const getChannels = data => createAPI('/app/v1_0/channels', 'get', data)
