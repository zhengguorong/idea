'use strict';

const mongoose = require('mongoose');
module.exports = app => {
  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    console.log('app 启动');
    mongoose.Promise = global.Promise;
  });
};
