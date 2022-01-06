/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台服务器地址
// export const baseUrl = 'http://139.196.87.48:8001'
export const baseUrl = 'http://localhost:8001'
// export const baseUrl = 'http://101.43.143.249:8001'
export default {
  baseUrl,
}
