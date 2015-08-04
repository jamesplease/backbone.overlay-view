// Create our JSDom document
global.jsdom = require('jsdom').jsdom;
global.document = jsdom(`
  <html>
    <head></head>
    <body></body>
  </html>
`);
global.window = global.document.parentWindow;
global.navigator = window.navigator = {
  userAgent: 'NodeJS JSDom',
  appVersion: ''
};

global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require('babel-core/register');
require('./setup')();
