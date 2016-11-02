require('babel-register');
require('babel-polyfill');

var getTextsAndSplit = require('./src/main.js'); 

module.exports = getTextsAndSplit;