import request from '@/utils/request'

export function findDataTypeList(data) {
  return request({
    url: '/dataType/list',
    method: 'POST',
    data
  })
}

export function addDataType(data) {
  return request({
    url: '/dataType/save',
    method: 'POST',
    data
  })
}

export function updateDataType(data) {
  return request({
    url: '/dataType/update',
    method: 'PUT',
    data
  })
}

export function removeDataType(data) {
  return request({
    url: '/dataType/remove',
    method: 'DELETE',
    data
  })
}

