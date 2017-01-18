var dbName = process.argv[2];
var noBampoTag = process.argv[3];
var inputPattern = './unSplittedTexts/**/*.*(txt|xml)';
var outputFolder = './splittedFolders';

// modules

var fs = require('fs');
var glob = require('glob');
var mkdirp = require('mkdirp');
var naturalSort = require('javascript-natural-sort');
var split2BamposInVols = require('./index.js');

// input strings by the help of glob module and output files to ./splittedFolders

var fileRoutes = glob.sync(inputPattern).sort(naturalSort);

var texts = fileRoutes.map(function(route) {
  return fs.readFileSync(route, 'utf8')
    .replace(/[\r\n]+/g, '\n')
    .replace(/^\s*\n/gm, '');
});

var bamposInVols = split2BamposInVols(fileRoutes, texts, noBampoTag);

bamposInVols.forEach(function(bamposInVol) {
  var folder = './splittedFolders/' + dbName + bamposInVol.volN;
  mkdirp.sync(folder);
  bamposInVol.bampoObjs.forEach(function(bampoObj) {
    var fileName = dbName + bampoObj.bampoN + '.xml';
    fs.writeFileSync(folder + '/' + fileName, bampoObj.bampoText, 'utf8');
  });
});