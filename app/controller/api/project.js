'use strict';

module.exports = app => {
  class ProjectController extends app.Controller {
    * create() {
      const rule = {
        title: { type: 'string', required: true },
        charge: { type: 'string', required: true },
        developer: { type: 'array' },
        startDate: { type: 'number', required: true },
        endDate: { type: 'number', required: true },
      };
      const userId = this.ctx.request.user.userId;
      this.ctx.request.body.author = userId;
      this.ctx.validate(rule);
      const body = this.ctx.request.body;
      const project = yield this.app.model.project.create(body);
      body._id = project._id;
      // 发送邀请邮件
      yield this.ctx.service.mail.sendInvitation(body);
      // 发送审核邮件
      const adminUsers = yield this.ctx.service.user.getAdminUser();
      body.examiner = adminUsers;
      yield this.ctx.service.mail.sendExamine(body);
      this.ctx.status = 201;
    }
    * destroy() {
      const id = this.ctx.request.body.id;
      yield this.app.model.project.remove({ _id: id });
      this.ctx.status = 200;
    }
    * update() {
      const body = this.ctx.request.body;
      // 对比开发者是否有新增，如果新增，发送邀请邮件
      const project = yield this.app.model.project.findOne({ _id: body._id });
      const diffDeveloper = yield this.ctx.service.project.getDiffDeveloper(project.developer, body.developer);
      yield this.app.model.project.findOneAndUpdate({ _id: body._id }, body);
      body.developer = diffDeveloper;
      yield this.ctx.service.mail.sendInvitation(body);
      this.ctx.status = 204;
    }
    * show() {
      const id = this.ctx.request.body.id;
      const result = yield this.app.model.project.findOne({ _id: id });
      this.ctx.body = result;
    }
    * index() {
      this.ctx.body = yield this.app.model.project.find({}).sort({ _id: -1 });
    }
    * getByUser() {
      const userId = this.ctx.request.user.userId;
      this.ctx.body = yield this.app.model.project.find({ author: userId }).sort({ _id: -1 });
    }
    * getMyJoinList() {
      const userId = this.ctx.request.user.userId;
      this.ctx.body = yield this.app.model.project.find({ 'developer.userId': userId }).sort({ _id: -1 });
    }
    * getByState() {
      const state = this.ctx.request.body.state;
      this.ctx.body = yield this.app.model.project.find({ state }).sort({ _id: -1 });
    }
    * getExcludeState() {
      const state = this.ctx.request.body.state;
      this.ctx.body = yield this.app.model.project.find({ state: { $ne: state } }).sort({ _id: -1 });
    }
    * changeState() {
      const id = this.ctx.request.body.id;
      const state = this.ctx.request.body.state;
      // 审核状态只有管理员才能操作
      const role = this.ctx.request.user.role;
      if ((state === 'ALLOW' || state === 'NOTALLOW') && role !== 'ADMIN') {
        this.ctx.status = 400;
        this.ctx.body = '权限不足';
        return;
      }
      yield this.app.model.project.findOneAndUpdate({ _id: id }, { state, state });
      this.ctx.status = 204;
    }
    * getTotal() {
      const userId = this.ctx.request.user.userId;
      const all = yield this.app.model.project.find({}).count();
      const process = yield this.app.model.project.find({ state: { $ne: 'FINISH' } }).count();
      const finish = yield this.app.model.project.find({ state: 'FINISH' }).count();
      const my = yield this.app.model.project.find({ author: userId }).count();
      const examine = yield this.app.model.project.find({ state: 'CREATE' }).count();
      const join = yield this.app.model.project.find({ 'developer.userId': userId }).count();
      this.ctx.body = { all, process, finish, my, examine, join };
    }
  }
  return ProjectController;
};
