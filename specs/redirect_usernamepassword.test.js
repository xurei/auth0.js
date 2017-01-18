var webdriverio = require('webdriverio');
var expect = require('expect.js');

describe('redirect', function () {
  this.timeout(99999999);
  var client;

  before(function () {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'firefox' } });
    return client.init();
  });

  it('with usernamepassword/login', function () {
    client = client
      .url('http://localhost:3000/example/test.html')
      .waitForExist('.loaded', 1000)
      .click('.login-redirect-usernamepassword')
      .waitUntil(function () {
        return Promise.all([client.getText('#err'), client.getText('#result')])
          .then(function(values) {
            return values[0] !== '' || values[1] !== '';
          });
      }, 5000)

    return Promise.all([client.getText('#err'), client.getText('#result')])
      .then(function(values) {
        expect(values[0]).to.eql('');

        var response = JSON.parse(values[1]);

        expect(response.accessToken).to.be.ok();
        expect(response.idToken).to.be.ok();
        expect(response.expiresIn).to.be.ok();
        expect(response.tokenType).to.be.ok();
        expect(response.idTokenPayload).to.be.ok();
        expect(response.state).to.not.be.ok();
        expect(response.refreshToken).to.not.be.ok();
        expect(response.appStatus).to.not.be.ok();
      });
  });

  after(function () {
    return client.end();
  });
});
