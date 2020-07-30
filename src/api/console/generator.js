import request from '@/utils/request'

export function findGeneratorTableList(data) {
  return request({
    url: '/generator/list',
    method: 'POST',
    data
  })
}

export function generatorCode(data) {
  return request({
    url: '/generator/code',
    method: 'POST',
    responseType: 'blob',
    data
  })
}
