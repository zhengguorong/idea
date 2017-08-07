'use strict';

module.exports = app => {
  const auth = app.middlewares.auth();
  // 页面路由
  app.get('/', 'web.project.list');
  app.get('/login', 'web.user.login');
  app.get('/register', 'web.user.register');

  // 接口路由
  app.post('/api/user/register', 'api.user.register');
  app.post('/api/user/login', 'api.user.login');
  app.get('/api/user', auth.isLogin, 'api.user.getUser');
  app.get('/api/users', auth.isLogin, 'api.user.getUsers');

  // 微信相关接口
  app.get('/api/wechat/login/:code', 'api.wechat.login');
  app.get('/api/wechat/getAccessToken', 'api.wechat.getAccessToken');

  // 百度相关接口
  app.get('/api/baidu/getAccessToken', 'api.baidu.getAccessToken');

  app.resources('/api/project', auth.isLogin, 'api.project');
  app.get('/api/project/getByUser', auth.isLogin, 'api.project.getByUser');
  app.get('/api/project/getByState', auth.isLogin, 'api.project.getByState');
  app.get('/api/project/getExcludeState', auth.isLogin, 'api.project.getExcludeState');
};
