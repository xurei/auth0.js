var webdriverio = require('webdriverio');
var expect = require('expect.js');

describe('redirect', function () {
  this.timeout(99999999);
  var client;

  before(function () {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'firefox' } });
    return client.init();
  });

  it('with hosted login page', function () {
    client = client
      .url('http://localhost:3000/example/test.html')
      .waitForExist('.loaded', 1000)
      .setValue('.login-response-type', 'id_token')
      .click('.login-redirect-authorize')
      .waitForExist('.auth0-lock-submit', 30000)
      .waitForExist('.auth0-lock-input-email div input', 1000)
      .waitForExist('.auth0-lock-input-password div input', 1000)
      .setValue('.auth0-lock-input-email div input', 'johnfoo@gmail.com')
      .setValue('.auth0-lock-input-password div input', '1234')
      .click('.auth0-lock-submit')
      .waitForExist('.loaded', 5000)
      .waitUntil(function () {
        return Promise.all([client.getText('#err'), client.getText('#result')])
          .then(function(values) {
            return values[0] !== '' || values[1] !== '';
          });
      }, 5000);



    return Promise.all([client.getText('#err'), client.getText('#result')])
      .then(function(values) {
        console.log(values);
        expect(values[0]).to.eql('');
        expect(values[1]).to.not.eql('');

        var response = JSON.parse(values[1]);

        expect(response.idToken).to.be.ok();
        expect(response.idTokenPayload).to.be.ok();
        expect(response.state).to.be.ok();

        expect(response.tokenType).to.not.be.ok();
        expect(response.accessToken).to.not.be.ok();
        expect(response.expiresIn).to.not.be.ok();
        expect(response.refreshToken).to.not.be.ok();
        expect(response.appStatus).to.not.be.ok();
      });
  });

  after(function () {
    return client.end();
  });
});
