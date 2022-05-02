import axios from '../axios'

/*
 * 文件下载模块
 */

// 文件上传
export const downloadFile = (data) => {
  return axios({
    url: '/download/file',
    method: 'post',
    responseType: 'blob',
    data
  })
}
