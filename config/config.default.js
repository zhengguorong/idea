'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {};
  // 微信相关
  config.appId = 'wx8bc5d288383a85c9';
  config.appSecret = '121dd6705a31acf18eb489ae9b8380aa';

  // 百度face相关
  config.baidu = {
    face: {
      appId: 'B6CeTHgrU5EXGiXlbfrlqCkW',
      appSecret: '5yN0idaBoU21VEDvQDpoAnz9DtXZXwFT',
    },
  };
  // should change to your own
  config.keys = appInfo.name + '_1492054139103_7031';
  config.jwtSecret = 'zhengguorong';
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/idea',
    options: {},
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.middleware = ['errorHandler']; // 使用koa的中间件
  config.auth = {
    test: 'tst',
  };
  config.errorHandler = {
    match: '/api',
  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'webapp/dist'),
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,
  };
  return config;
};