var version = require('../../version');
var PluginHandler = require('./plugin-handler');

function CordovaPlugin() {
  this.version = version.raw;
  this.extensibilityPoints = [
    'popup.authorize',
    'popup.preload'
  ];
}

CordovaPlugin.prototype.supports = function (extensibilityPoint) {
  return this.extensibilityPoints.indexOf(extensibilityPoint) > -1;
};

CordovaPlugin.prototype.init = function () {
  return new PluginHandler();
};

module.exports = CordovaPlugin;
