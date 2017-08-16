'use strict';
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const uuid = require('node-uuid');

module.exports = function* (ctx) {
  const parts = ctx.multipart();
  const domain = this.app.config.domain;
  let part;
  while ((part = yield parts) != null) {
    if (!part.length) {
      if (!part.filename) {
        ctx.status = 400;
        return;
      }
      try {
        const ext = part.filename.split('.')[1]; // 文件后缀名
        const uuidName = uuid.v1().replace(/-/g, '') + '.' + ext;
        const rootPath = path.resolve(this.app.baseDir + '/app/public/upload');
        const writeStream = fs.createWriteStream(rootPath + '/' + uuidName);
        part.pipe(writeStream);
        const accessPath = domain + '/upload/' + uuidName;
        ctx.body = { url: accessPath, name: part.filename };
      } catch (err) {
        yield sendToWormhole(part);
        ctx.status = 400;
        throw err;
      }
    }
  }
};
