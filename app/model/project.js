'use strict';
// 需求模型
module.exports = mongoose => {
  const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    state: { type: String, enum: ['CREATE', 'ALLOW', 'NOTALLOW', 'PP', 'SRA', 'DESIGN', 'CODING', 'QA', 'FINISH'], default: 'CREATE' }, // 项目状态 立项，审核不通过，人员准备，需求分析，设计 ,编码，测试，上线
    detail: { type: String }, // 项目说明
    charge: { type: String, required: true }, // 负责人
    developer: { type: Array }, // 参与开发人员
    startDate: { type: Number, required: true }, // 开始时间
    endDate: { type: Number, required: true }, // 结束时间
    platform: { type: Array, required: true }, // 开发平台
    files: { type: Array }, // 附件
  });
  return mongoose.model('Project', ProjectSchema);
};
