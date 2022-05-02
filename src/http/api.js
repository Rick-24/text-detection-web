/*
 * 接口统一集成模块
 */
import * as textDetection from './modules/text-detection'
import * as areaIndex from './modules/area-index'
import * as user from './modules/user'
import * as loginlog from './modules/loginlog'
import * as login from './modules/login'
import * as menu from './modules/menu'
import * as role from './modules/role'
import * as keyword from './modules/keyword'
import * as keytype from './modules/keytype'
import * as wordDetect from './modules/wordDetect'
import * as download from './modules/download'
// 默认全部导出
export default {
  textDetection,
  areaIndex,
  user,
  loginlog,
  login,
  menu,
  role,
  keyword,
  keytype,
  wordDetect,
  download
}
