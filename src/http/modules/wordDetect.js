import axios from '../axios'

/*
 * 关键词检测模块
 */

// 文件上传
export const file = (data) => {
  return axios({
    url: '/detect/keyword',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 300000,
    data
  })
}

