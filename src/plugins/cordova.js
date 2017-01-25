var version = require('../version');

function CordovaPlugin() {
  this.version = version.raw;
  this.extensibilityPoints = [
    'popup.authorize'
  ];
}

CordovaPlugin.prototype.supports = function (extensibilityPoint) {
  return this.extensibilityPoints.indexOf(extensibilityPoint) > -1;
};


CordovaPlugin.prototype.init = function () {
  console.log('CordovaPlugin-init');
};

module.exports = CordovaPlugin;
