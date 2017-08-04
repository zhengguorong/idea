import * as http from '../util/http'

const getList = () => {
  return http.get('/api/project')
}
const getMyList = () => {
  return http.get('/api/project/getByUserId')
}
const create = (data) => {
  return http.post('/api/project', data)
}
export default {
  getList, create, getMyList
}
