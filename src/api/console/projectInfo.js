import request from '@/utils/request'

export function findProjectInfoList(data) {
  return request({
    url: '/projectInfo/list',
    method: 'POST',
    data
  })
}

export function addProjectInfo(data) {
  return request({
    url: '/projectInfo/save',
    method: 'POST',
    data
  })
}

export function updateProjectInfo(data) {
  return request({
    url: '/projectInfo/update',
    method: 'PUT',
    data
  })
}

export function removeProjectInfo(data) {
  return request({
    url: '/projectInfo/remove',
    method: 'DELETE',
    data
  })
}

