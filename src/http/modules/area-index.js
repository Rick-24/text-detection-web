import axios from '../axios'

/*
 * 区域列表模块
 */

// 文件上传
export const province = () => {
  return axios({
    url: '/area/province',
    method: 'get'
  })
}

export const city = (data) => {
  return axios({
    url: '/area/city',
    method: 'get',
    params: {'id': data}
  })
}

export const district = (data) => {
  return axios({
    url: '/area/district',
    method: 'get',
    params: {'id': data}
  })
}
