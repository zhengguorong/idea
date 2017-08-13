'use strict';
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const uuid = require('node-uuid');

module.exports = function* (ctx) {
  const stream = yield ctx.getFileStream();
  const domain = this.app.config.domain;
  try {
    const ext = stream.filename.split('.')[1]; // 文件后缀名
    const fileName = uuid.v1().replace(/-/g, '') + '.' + ext;
    const rootPath = path.resolve(this.app.baseDir + '/app/public/upload');
    const part = fs.createWriteStream(rootPath + '/' + fileName);
    stream.pipe(part);
    part.on('error', err => {
      console.log(err, 'upload Error');
    });
    part.on('finish', err => {
      console.log(err, 'upload finish');
    });
    const accessPath = domain + '/upload/' + fileName;
    ctx.body = { url: accessPath, name: stream.filename };
    // process file or upload to cloud storage
  } catch (err) {
    // must consume the stream, otherwise browser will be stuck.
    yield sendToWormhole(stream);
    ctx.status = 400;
    throw err;
  }
};
