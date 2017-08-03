import * as http from '../util/http'

export const getList = () => {
  return http.get('/api/project')
}
