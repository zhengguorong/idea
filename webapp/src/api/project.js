import * as http from '../util/http'

const getList = () => {
  return http.get('/api/project')
}
const getMyList = () => {
  return http.get('/api/project/getByUser')
}
const getFinish = () => {
  return http.get('/api/project/getByState', {state: 'FINISH'})
}
const getExamine = () => {
  return http.get('/api/project/getByState', {state: 'CREATE'})
}
const create = (data) => {
  return http.post('/api/project', data)
}
const getActive = () => {
  return http.get('/api/project/getExcludeState', {state: 'FINISH'})
}
const getDetail = (id) => {
  return http.get('/api/project/' + id)
}
const update = (data) => {
  return http.put('/api/project/' + data._id, data)
}
const del = (id) => {
  return http.del('/api/project', id)
}
const changeState = (data) => {
  return http.get(`/api/project/${data.id}/changeState`, {state: data.state})
}
export default {
  getList, create, getMyList, getFinish, getActive, getDetail, update, del, changeState, getExamine
}
