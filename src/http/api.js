/*
 * 接口统一集成模块
 */
import * as textDetection from './modules/text-detection'
import * as areaIndex from './modules/area-index'
import * as user from './modules/user'
import * as loginlog from './modules/loginlog'
import * as login from './modules/login'

// 默认全部导出
export default {
  textDetection,
  areaIndex,
  user,
  loginlog,
  login
}
