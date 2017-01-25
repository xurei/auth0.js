function PluginHandler(plugins) {
  this.plugins = plugins;
}

PluginHandler.prototype.get = function (extensibilityPoint) {
  for (var a = 0; a < this.plugins.length; a++) {
    if (this.plugins[a].supports(extensibilityPoint)) {
      return this.plugins[a];
    }
  }

  return null;
};

module.exports = PluginHandler;
