'use strict';
const nodemailer = require('nodemailer');
const moment = require('moment');

module.exports = app => {
  const transporter = nodemailer.createTransport({
    host: app.config.mail.host,
    port: app.config.mail.port,
    secure: false,
    auth: {
      user: app.config.mail.auth.user,
      pass: app.config.mail.auth.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  class MailService extends app.Service {
    // 发送邮件
    * send(to, subject, text, html) {
      const mailOptions = {
        from: app.config.mail.auth.user, to, subject, text, html,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }
    // 发送邀请邮件
    * sendInvitation({ _id, developer, title, charge, platform, startDate, endDate, detail }) {
      const developerStr = this.developerObjectToString(developer);
      // 不知道为什么forEach不能用yield
      for (let i = 0; i < developer.length; i++) {
        const item = developer[i];
        if (item.email) {
          const style = '<div style="min-width: 500px;padding: 1em;border: 1em solid transparent;background: linear-gradient(white, white) padding-box,repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0 / 6em 6em;max-width: 20em;font: 100%/1.6 Baskerville, Palatino, serif;">';
          const headerHtml = `<h3 style="text-align: center">项目邀请函</h3><p>${item.nickName}您好：</p><p style="text-indent:2em">${charge}邀请您参加"${title}"项目的开发</p>`;
          const chargeHtml = `<p style="text-indent:2em">负责人：${charge}</p>`;
          const developerHtml = `<p style="text-indent:2em">参与人：${developerStr}</p>`;
          const platformHtml = `<p style="text-indent:2em">开发平台：${platform}</p>`;
          const startDateHtml = `<p style="text-indent:2em">开始时间：${moment(startDate).format('YYYY年MM月DD日')}</p>`;
          const endDateHtml = `<p style="text-indent:2em">结束时间：${moment(endDate).format('YYYY年MM月DD日')}</p>`;
          const detailHtml = `<p style="text-indent:2em">需求说明：${detail}</p>`;
          const linkHtml = `<p style="text-indent:2em"><a href="${app.config.domain}/#/projectDetail/${_id}">点击查看详情</a></p>`;
          const footerHtml = '<div style="text-align:right">from： chaos实验室自动发送</div></div>';
          const releaseHtml = style + headerHtml + chargeHtml + developerHtml + platformHtml + startDateHtml + endDateHtml + detailHtml + linkHtml + footerHtml;
          yield this.send(item.email, 'chaos实验室系统通知', '', releaseHtml);
        }
      }
    }
   // 发送审核邮件
    * sendExamine({ _id, developer, title, charge, platform, startDate, endDate, detail, examiner }) {
      const developerStr = this.developerObjectToString(developer);
      // 不知道为什么forEach不能用yield
      for (let i = 0; i < examiner.length; i++) {
        const item = examiner[i];
        if (item.email) {
          const style = '<div style="min-width: 500px;padding: 1em;border: 1em solid transparent;background: linear-gradient(white, white) padding-box,repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0 / 6em 6em;max-width: 20em;font: 100%/1.6 Baskerville, Palatino, serif;">';
          const headerHtml = `<h3 style="text-align: center">项目审核通知</h3><p>${item.nickName}您好：</p><p style="text-indent:2em">${charge}申请"${title}"项目的审核</p>`;
          const chargeHtml = `<p style="text-indent:2em">负责人：${charge}</p>`;
          const developerHtml = `<p style="text-indent:2em">参与人：${developerStr}</p>`;
          const platformHtml = `<p style="text-indent:2em">开发平台：${platform}</p>`;
          const startDateHtml = `<p style="text-indent:2em">开始时间：${moment(startDate).format('YYYY年MM月DD日')}</p>`;
          const endDateHtml = `<p style="text-indent:2em">结束时间：${moment(endDate).format('YYYY年MM月DD日')}</p>`;
          const detailHtml = `<p style="text-indent:2em">需求说明：${detail}</p>`;
          const linkHtml = `<p style="text-indent:2em"><a href="${app.config.domain}/#/projectDetail/${_id}">点击查看详情</a></p>`;
          const footerHtml = '<div style="text-align:right">from： chaos实验室自动发送</div></div>';
          const releaseHtml = style + headerHtml + chargeHtml + developerHtml + platformHtml + startDateHtml + endDateHtml + detailHtml + linkHtml + footerHtml;
          yield this.send(item.email, 'chaos实验室系统通知', '', releaseHtml);
        }
      }
    }
    developerObjectToString(developer) {
      let developerStr = '';
      developer.forEach(item => {
        developerStr = developerStr + item.nickName + '，';
      });
      developerStr = developerStr.substring(0, developerStr.length - 1);
      return developerStr;
    }
  }
  return MailService;
};
