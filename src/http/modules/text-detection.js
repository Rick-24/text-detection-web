import axios from '../axios'

/*
 * 操作日志模块
 */

// 删除
export const file = (data) => {
  return axios({
    url: '/text/detection/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
// 分页查询
export const text = (data) => {
  return axios({
    url: '/text/detection/text',
    method: 'post',
    data
  })
}
