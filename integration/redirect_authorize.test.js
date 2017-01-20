describe('redirect authorize', function () {
  // this.timeout(9999999);
  before(function (client) {
  // it('should result in a successful transaction', function (client, done) {

    client
      .url('https://auth0.github.io/auth0.js/example/test.html')
        .waitForElementPresent('#loaded', 10000)
          .click('.login-redirect-authorize')
        .waitForElementPresent('#hlploaded', 30000)
          .setValue('#email', 'johnfoo@gmail.com')
          .setValue('#password', '1234')
          .click('#upLogin')
        .waitForElementPresent('#parsed', 10000);
  });

  it('should result in a successful transaction', function (client) {
    client.expect.element('#result').to.not.equal('');
  });

  after(function (client, done) {
    console.log('END')
    client.end();
    // client.end(function() {
    //   console.log('DONE')
    //   done();
    // });
    // client.customSauceEnd(done);
  });
});
