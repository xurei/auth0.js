var webdriverio = require('webdriverio');

module.exports = function() {
  var client = webdriverio.remote({
    desiredCapabilities: {
      browserName: 'chrome',
      version: '27',
      platform: 'XP',
      tags: ['examples'],
      name: 'This is an example test'
    },
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCELABS_USER,
    key: process.env.SAUCELABS_KEY
  }

  return client;
};
