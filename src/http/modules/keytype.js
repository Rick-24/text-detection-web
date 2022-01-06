import axios from '../axios'
/*
 * 关键字类型管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/keytype/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/keytype/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/keytype/findPage',
    method: 'post',
    data
  })
}
// 查询全部
export const findAll = () => {
  return axios({
    url: '/keytype/findAll',
    method: 'get'
  })
}

