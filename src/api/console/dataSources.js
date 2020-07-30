import request from '@/utils/request'

export function findDataSourceList(params) {
  return request({
    url: '/dataSource/list',
    method: 'GET',
    params
  })
}

export function addDataSource(params) {
  return request({
    url: '/dataSource/add',
    method: 'POST',
    data: params
  })
}


export function removeDataSource(params) {
  return request({
    url: '/dataSource/remove',
    method: 'DELETE',
    data: params
  })
}

