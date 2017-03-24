var dbName = process.argv[2];
var noBampoTag = process.argv[3];
var globPattern = './' + dbName + '/' + dbName + '*/*.*(txt|xml)';
var outputFolder = './splittedFolders';

// modules

var fs = require('fs');
var glob = require('glob');
var mkdirp = require('mkdirp');
var naturalSort = require('javascript-natural-sort');
var makeTextsInVols = require('./index.js');

// input strings by the help of glob module and output files to ./splittedFolders

var originalTexts = glob.sync(inputPattern)
  .sort(naturalSort);
  .map(function(route) {
    return fs.readFileSync(route, 'utf8')
      .replace(/[\r\n]+/g, '\n')
      .replace(/^\s*\n/gm, '');
    });

var textsInVols = makeTextsInVols(originalTexts, noBampoTag);

textsInVols.forEach(function(textsInVol) {
  var folder = './splittedFolders/' + dbName + textsInVol.volN;
  mkdirp.sync(folder);
  textsInVol.textObjs.forEach(function(textObj) {
    var fileName = dbName + textObj.textN + '.xml';
    fs.writeFileSync(folder + '/' + fileName, textObj.text.trim(), 'utf8');
  });
});