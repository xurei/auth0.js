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
        .waitForExist('#loaded', 1000)
          // .setValue('.login-response-type', 'id_token')
          .click('.login-redirect-authorize')
        .waitForExist('#hlploaded', 30000)
          .setValue('#email', 'johnfoo@gmail.com')
          .setValue('#password', '1234')
          .click('#upLogin')
        .waitForExist('#loaded', 5000)
          .waitUntil(function () {
            client.getUrl().then(function(url){
              console.log(url)
            });
            return Promise.all([client.getText('#err'), client.getText('#result')])
              .then(function(values) {
                return values[0] !== '' || values[1] !== '';
              });
          }, 5000);

    return Promise.all([client.getText('#err'), client.getText('#result')])
      .then(function(values) {
        expect(values[0]).to.eql('');
        expect(values[1]).to.not.eql('');

        var response = JSON.parse(values[1]);

        expect(response.idToken).to.be.ok();
        expect(response.idTokenPayload).to.be.ok();
        expect(response.state).to.not.be.ok();
        expect(response.accessToken).to.be.ok();
        expect(response.tokenType).to.be.ok();
        expect(response.expiresIn).to.be.ok();
        expect(response.refreshToken).to.not.be.ok();
        expect(response.appStatus).to.not.be.ok();
      });
  });

  after(function () {
    return client.end();
  });
});
