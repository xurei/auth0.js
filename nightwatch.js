//nightwatch.conf.js
module.exports = {
  src_folders: ['integration'],
  output_folder: 'reports',
  custom_commands_path: 'custom_commands',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',
  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.ie.driver': ''
    }
  },
  test_workers: {enabled: true, workers: 'auto'},
  test_runner: {
    type: 'mocha',
    options: {
      ui: 'bdd',
      reporter: 'list'
    }
  },
  test_settings: {
    default: {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port : 80,
      selenium_host : 'ondemand.saucelabs.com',
      silent: false,
      screenshots: {
        enabled: false,
        path: ''
      },
      username: process.env.SAUCELABS_USER,
      access_key: process.env.SAUCELABS_KEY,
      desiredCapabilities: {
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'OS X 10.11',
        version: '47'
      }
    },
    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11.0'
      }
    }
  }
};
