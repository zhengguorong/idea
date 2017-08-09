'use strict';

module.exports = app => {
  const auth = app.middlewares.auth();

  app.redirect('/', '/index.html');
  // 接口路由
  app.post('/api/user/register', 'api.user.register');
  app.post('/api/user/login', 'api.user.login');
  app.post('/api/user', auth.isLogin, 'api.user.getUser');
  app.post('/api/users', auth.isLogin, 'api.user.getUsers');

  // app.resources('/api/project', auth.isLogin, 'api.project');
  app.post('/api/project', auth.isLogin, 'api.project.index');
  app.post('/api/project/update', auth.isLogin, 'api.project.update');
  app.post('/api/project/delete', auth.isLogin, 'api.project.destroy');
  app.post('/api/project/create', auth.isLogin, 'api.project.create');
  app.post('/api/project/getById', auth.isLogin, 'api.project.show');
  app.post('/api/project/changeState', auth.isLogin, 'api.project.changeState');
  app.post('/api/project/getByUser', auth.isLogin, 'api.project.getByUser');
  app.post('/api/project/getByState', auth.isLogin, 'api.project.getByState');
  app.post('/api/project/getExcludeState', auth.isLogin, 'api.project.getExcludeState');
};
