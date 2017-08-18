'use strict';
module.exports = app => {
  class ProjectService extends app.Service {
    // 对比开发者对象，寻找出差异
    * getDiffDeveloper(oldDeveloper, newDeveloper) {
      const diffDeveloper = [];
      newDeveloper.forEach(item => {
        let findIndex = -1;
        oldDeveloper.forEach((oldItem, index) => {
          if (oldItem.userId === item.userId) {
            findIndex = index;
            return false;
          }
        });
        if (findIndex === -1) diffDeveloper.push(item);
      });
      return diffDeveloper;
    }
  }
  return ProjectService;
};
