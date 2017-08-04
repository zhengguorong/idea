
export default [{
  path: '/login',
  name: 'login',
  component: require('@/views/user/login')
}, {
  path: '/register',
  name: 'register',
  component: require('@/views/user/register')
}, {
  path: '/',
  name: 'projectList',
  component: require('@/views/project/list')
}, {
  path: '/process',
  name: 'processProject',
  component: require('@/views/project/list')
}, {
  path: '/finish',
  name: 'finishProject',
  component: require('@/views/project/list')
}, {
  path: '/my',
  name: 'myProject',
  component: require('@/views/project/list')
}, {
  path: '/createProject',
  name: 'createProject',
  component: require('@/views/project/create')
}]
