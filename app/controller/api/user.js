'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * register() {
      const userId = this.ctx.request.body.userId;
      const password = this.ctx.request.body.password;
      const nickName = this.ctx.request.body.nickName;
      if (!userId || !password) {
        this.ctx.status = 400;
        this.ctx.body = '用户名或者密码不能为空';
        return;
      }
      yield this.ctx.service.user.register({ nickName, userId, password });
      const token = yield this.ctx.service.user.login({ userId, password });
      const result = {};
      result.token = token;
      this.ctx.body = result;
      this.ctx.status = 200;
    }
    * login() {
      const userId = this.ctx.request.body.userId;
      const password = this.ctx.request.body.password;
      if (!userId || !password) {
        this.ctx.status = 400;
        this.ctx.body = '用户名或者密码不能为空';
        return;
      }
      const token = yield this.ctx.service.user.login({ userId, password });
      const user = yield this.ctx.service.user.getUserById(userId);
      user.token = token;
      this.ctx.body = user;
      this.ctx.status = 200;
    }
    * getUser() {
      const userId = this.ctx.request.user.userId;
      const user = yield this.ctx.service.user.getUserById(userId);
      this.ctx.body = user;
    }
    * getUsers() {
      const users = yield this.ctx.service.user.getUsers();
      this.ctx.body = users;
    }
    * update() {
      const userId = this.ctx.request.user.userId;
      const updateInfo = this.ctx.request.body;
      yield this.ctx.service.user.update(userId, { email: updateInfo.email, mobilePhone: updateInfo.mobilePhone, nickName: updateInfo.nickName });
      const user = yield this.ctx.service.user.getUserById(userId);
      this.ctx.body = user;
    }
    * changePassword() {
      const userId = this.ctx.request.user.userId;
      const password = this.ctx.request.body.password;
      if (!password) {
        this.ctx.status = 400;
        this.ctx.body = '密码为空';
        return;
      }
      yield this.ctx.service.user.changePassword(userId, password);
      this.ctx.body = '修改成功';
    }
  }
  return UserController;
};

