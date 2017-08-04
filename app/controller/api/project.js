'use strict';

module.exports = app => {
  class ProjectController extends app.Controller {
    * create() {
      // const rule = {
      //   title: { type: 'string', required: true },
      //   charge: { type: 'string', required: true },
      //   developer: { type: 'array' },
      //   endDate: { type: 'number', required: true },
      // };
      const userId = this.ctx.request.user.userId;
      this.ctx.request.body.author = userId;
      // this.ctx.validate(rule);
      yield this.app.model.project.create(this.ctx.request.body);
      this.ctx.status = 201;
    }
    * destroy() {
      const id = this.ctx.params.id;
      yield this.app.model.project.remove({ _id: id });
      this.ctx.status = 200;
    }
    * update() {
      const id = this.ctx.params.id;
      yield this.app.model.project.findOneAndUpdate({ _id: id }, this.ctx.request.body);
      this.ctx.status = 204;
    }
    * show() {
      const id = this.ctx.params.id;
      const result = yield this.app.model.project.findOne({ _id: id });
      this.ctx.body = result;
    }
    * index() {
      this.ctx.body = yield this.app.model.project.find({});
    }
    * getByUserId() {
      const userId = this.ctx.request.user.userId;
      this.ctx.body = yield this.app.model.project.find({ author: userId });
    }
    * getByState() {
      const state = this.ctx.request.body.state;
      this.ctx.body = yield this.app.model.project.find({ state: state });
    }
  }
  return ProjectController;
};
