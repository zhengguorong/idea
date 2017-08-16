import * as http from '../util/http'

const login = (userInfo) => {
  return http.post('/api/user/login', userInfo)
}
const register = (userInfo) => {
  return http.post('/api/user/register', userInfo)
}
const logout = () => {
  return http.post('/api/user/logout')
}
const getUsers = () => {
  return http.post('/api/users')
}
const getUser = () => {
  return http.post('/api/user')
}
const update = (userInfo) => {
  return http.post('/api/user/update', userInfo)
}
const changePassword = (password) => {
  return http.post('/api/user/changePassword', {password})
}

export default {
  login, register, logout, getUsers, getUser, update, changePassword
}
