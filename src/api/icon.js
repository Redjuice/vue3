import request from '@/plugins/axios'

export function getIconList(params) {
  return request({
    url: '/icon/getList',
    method: 'get',
    params,
  })
}
