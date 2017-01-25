var fs = require('fs');
var webpack = require('webpack');
var CustomVarLibraryNamePlugin = require('webpack-custom-var-library-name-plugin');

var path = require('path');

var entryPoints = {
  'auth0-js': ['./src/index.js']
};

var nameOverrides = {
  'auth0-js': {
    var: 'auth0',
    file: 'auth0'
  }
};

var files = fs.readdirSync(path.join(__dirname, './src/plugins/'));

for (var a = 0; a < files.length; a++) {
  var pluginName = getPluginName(files[a]);
  var className = getClassName(files[a]);
  entryPoints[pluginName] = ['./src/plugins/' + files[a]];

  nameOverrides[pluginName] = {
    var: className,
    file: pluginName
  };
}

module.exports = {
  devtool: 'eval',
  entry: entryPoints,
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    publicPath: 'http://localhost:3000/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  progress: true,
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: true
  },
  keepalive: true,
  stats: {
    colors: true,
    modules: true,
    reasons: true
  },
  stylus: {
    preferPathResolver: 'webpack'
  },
  plugins: [
    new CustomVarLibraryNamePlugin({
      name: {
        'auth0-js': {
          var: 'auth0',
          file: 'auth0'
        },
        'cordova-auth0-plugin': {
          var: 'CordovaAuth0Plugin',
          file: 'cordova-auth0-plugin'
        }
      }
    })
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  ]
};

function getPluginName(filename) {
  var parts = filename.split('.');
  parts.pop();
  return parts.join('.') + '-auth0-plugin';
}

function getClassName(filename) {
  var parts = filename.split('.');
  parts.pop();
  name = parts.join('.');
  name = name[0].toUpperCase() + name.slice(1);
  return name + 'Auth0Plugin';
}