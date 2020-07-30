import request from '@/utils/request'

export function findTemplateList(params) {
  return request({
    url: '/template/list',
    method: 'POST',
    params
  })
}