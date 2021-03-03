import request from '@/plugins/axios'

export function getRouterList(params) {
  return request({
    url: '/menu/navigate',
    method: 'get',
    params,
  })
}
