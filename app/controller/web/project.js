'use strict';

module.exports = app => {
  class ProjectController extends app.Controller {
    * list() {
      const list = yield this.app.model.project.find({});
      yield this.ctx.render('project/list.tpl', { projects: list });
    }
  }
  return ProjectController;
};
