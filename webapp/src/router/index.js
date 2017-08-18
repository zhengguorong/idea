
export default [{
  path: '/login',
  name: 'login',
  component: require('@/views/user/login')
}, {
  path: '/register',
  name: 'register',
  component: require('@/views/user/register')
}, {
  path: '/index',
  name: 'index',
  component: require('@/views/project/index')
}, {
  path: '/',
  name: 'index',
  component: require('@/views/project/index')
}, {
  path: '/process',
  name: 'process',
  component: require('@/views/project/active')
}, {
  path: '/finish',
  name: 'finish',
  component: require('@/views/project/finish')
}, {
  path: '/my',
  name: 'my',
  component: require('@/views/project/my')
}, {
  path: '/examine',
  name: 'examine',
  component: require('@/views/project/examine')
}, {
  path: '/projectDetail/:id',
  name: 'projectDetail',
  component: require('@/views/project/detail')
}, {
  path: '/createProject',
  name: 'createProject',
  component: require('@/views/project/create')
}, {
  path: '/updateProject/:id',
  name: 'updateProject',
  component: require('@/views/project/update')
}, {
  path: '/userInfo',
  name: 'userInfo',
  component: require('@/views/user/info')
}]
