import * as http from '../util/http'

const getMyList = () => {
  return http.post('/api/project/getByUser')
}
const getFinish = () => {
  return http.post('/api/project/getByState', {state: 'FINISH'})
}
const getExamine = () => {
  return http.post('/api/project/getByState', {state: 'CREATE'})
}
const getActive = () => {
  return http.post('/api/project/getExcludeState', {state: 'FINISH'})
}
const getList = () => {
  return http.post('/api/project')
}
const getMyJoinList = () => {
  return http.post('/api/project/getMyJoinList')
}
const create = (data) => {
  return http.post('/api/project/create', data)
}
const getDetail = (id) => {
  return http.post('/api/project/getById', {id: id})
}
const update = (data) => {
  return http.post('/api/project/update', data)
}
const patch = (data) => {
  return http.post('/api/project/patch', data)
}
const del = (id) => {
  return http.post('/api/project/delete', {id: id})
}
const changeState = (data) => {
  return http.post('/api/project/changeState', data)
}
const getTotal = () => {
  return http.post('/api/project/getTotal')
}
const getSearchSuggest = () => {
  return http.post('/api/project/getSearchSuggest')
}
const search = (keyword) => {
  return http.post('/api/project/search', {keyword: keyword})
}
export default {
  getList, create, getMyList, getFinish, getActive, getDetail, update, patch, del, changeState, getExamine, getTotal, getMyJoinList, getSearchSuggest, search
}
