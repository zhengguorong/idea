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
      yield this.app.model.project.create(this.ctx.request.body);
      this.ctx.status = 201;
    }
    * destroy() {
      const id = this.ctx.request.body.id;
      yield this.app.model.project.remove({ _id: id });
      this.ctx.status = 200;
    }
    * update() {
      const body = this.ctx.request.body;
      yield this.app.model.project.findOneAndUpdate({ _id: body._id }, body);
      this.ctx.status = 204;
    }
    * show() {
      const id = this.ctx.request.body.id;
      const result = yield this.app.model.project.findOne({ _id: id });
      this.ctx.body = result;
    }
    * index() {
      this.ctx.body = yield this.app.model.project.find({}).sort({ '_id' : -1 });
    }
    * getByUser() {
      const userId = this.ctx.request.user.userId;
      this.ctx.body = yield this.app.model.project.find({ author: userId }).sort({ '_id' : -1 });
    }
    * getByState() {
      const state = this.ctx.request.body.state;
      this.ctx.body = yield this.app.model.project.find({ state: state }).sort({ '_id' : -1 });
    }
    * getExcludeState() {
      const state = this.ctx.request.body.state;
      this.ctx.body = yield this.app.model.project.find({ state: { '$ne': state } }).sort({ '_id' : -1 });
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
  }
  return ProjectController;
};
