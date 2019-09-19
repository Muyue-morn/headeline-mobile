/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-18 20:39:55
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-18 21:33:11
 * 各个组件的注册
 */
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate' // 验证组件导入
import * as rules from 'vee-validate/dist/rules' // 所有的验证规则
import zhCN from 'vee-validate/dist/locale/zh_CN' // 提示消息语言包

// 遍历添加所有的规则
for (let rule in rules) {
  // add the rule
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}
// 添加一条自定义规则
extend('mobile', {
  validate: value => /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value),
  message: '请填写正确格式的{_field_}'
})
// Register it globally
export default {
  install (Vue) {
    Vue.component('ValidationProvider', ValidationProvider) // 注册校验组件
    Vue.component('ValidationObserver', ValidationObserver) // 注册校验组件
  }
}
