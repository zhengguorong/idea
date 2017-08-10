'use strict';

module.exports = appInfo => {
  const config = {};
  config.domain = 'http://chaostest.limesoftware.cn';
  config.keys = appInfo.name + '_1492054139103_7031';
  config.mongoose = {
    url: 'mongodb://127.0.0.1/ideatest',
    options: {},
  };
  return config;
};
