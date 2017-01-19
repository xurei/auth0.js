var webdriverio = require('webdriverio');

module.exports = function() {
  var client = webdriverio.remote({
    desiredCapabilities: { browserName: 'firefox' },
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: 'saucelabs-auth0',
    key: '1945acd0-f7d5-4b1f-b10a-5ece59aab65b'
  });

  return client.init();
};
