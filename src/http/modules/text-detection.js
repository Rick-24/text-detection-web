import axios from '../axios'

/*
 * 文件上传模块
 */

// 文件上传
export const file = (data) => {
  return axios({
    url: '/text/detection/fileV2',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 300000,
    data
  })
}
// 文本上传
export const text = (data) => {
  return axios({
    url: '/text/detection/text',
    method: 'post',
    data
  })
}
