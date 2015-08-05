// Set up a simple JSDom config
require('simple-jsdom');

global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require('babel-core/register');
require('./setup')();
