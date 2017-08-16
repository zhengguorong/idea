'use strict';
const path = require('path');
const fs = require('fs');
// const sendToWormhole = require('stream-wormhole');
const uuid = require('node-uuid');

// module.exports = function* (ctx) {
//   const stream = yield ctx.getFileStream();
//   const domain = this.app.config.domain;
//   try {
//     const ext = stream.filename.split('.')[1]; // 文件后缀名
//     const fileName = uuid.v1().replace(/-/g, '') + '.' + ext;
//     const rootPath = path.resolve(this.app.baseDir + '/app/public/upload');
//     const part = fs.createWriteStream(rootPath + '/' + fileName);
//     stream.pipe(part);
//     stream.on('error', err => {
//       console.log(err, 'upload Error');
//     });
//     stream.on('finish', err => {
//       console.log(err, 'upload finish');
//     });
//     stream.on('end', () => {
//       console.log('upload end');
//     });
//     const accessPath = domain + '/upload/' + fileName;
//     ctx.body = { url: accessPath, name: stream.filename };
//     // process file or upload to cloud storage
//   } catch (err) {
//     // must consume the stream, otherwise browser will be stuck.
//     yield sendToWormhole(stream);
//     ctx.status = 400;
//     throw err;
//   }
// };
module.exports = function* (ctx) {
  const parts = this.multipart();
  let object;
  let part;
  let uuidName;
  part = yield parts;
  const filename = part.filename;
  while (part) {
    if (part.length) {
      console.log('field: ' + part[0]);
    } else {
      const ext = part.filename.split('.')[1]; // 文件后缀名
      uuidName = uuid.v1().replace(/-/g, '') + '.' + ext;
      // object = yield this.oss.put('idea/' + uuidName, part);
      const rootPath = path.resolve(this.app.baseDir + '/app/public/upload');
      const writeStream = fs.createWriteStream(rootPath + '/' + uuidName);
      part.pipe(writeStream);
    }
    part = yield parts;
  }
  // if (object) {
  const domain = this.app.config.domain;
  const accessPath = domain + '/upload/' + uuidName;
  ctx.body = { url: accessPath, name: filename };
  // } else {
    // this.body = 'please select a file to upload！';
  // }
};
