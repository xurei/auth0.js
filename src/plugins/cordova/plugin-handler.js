var urljoin = require('url-join');
var PopupHandler = require('./mobile-popup-handler');

function PluginHandler() {

}

PluginHandler.prototype.processParams = function (params) {
  params.redirectUri = urljoin('https://' + params._domain, 'mobile');
  delete params.owp;
  return params;
};

PluginHandler.prototype.preloadPopup = function (options) {
  var popupHandler = new PopupHandler();
  popupHandler.preload(options);

  return popupHandler;
};

module.exports = PluginHandler;
