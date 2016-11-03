var dbName = process.argv[2] || 'degekangyur';
var noBampoTag = process.argv[3] || false;
var inputPattern = './unSplittedTexts/**/*.*(txt|xml)';
var outputFolder = './splittedFolders';

// modules

var glob = require('glob');
var mkdirp = require('mkdirp');
var fs = require('fs');
var makeBampos = require('./index.js');

// input strings by the help of glob module and output files to ./splittedFolders

var fileRoutes = glob.sync(inputPattern, {'nosort': true});
var texts = fileRoutes.map(function(route) {
  return fs.readFileSync(route, 'utf8')
    .replace(/^\s*\n/gm, '');
});

var bamposInVols = makeBampos(fileRoutes, texts, noBampoTag);

/*
bamposInVols.forEach(function(bamposInVol) {
  var folder = './splittedFolders/' + dbName + bamposInVol.volN;
  //mkdirp.sync(folder);
  console.log(folder);
  bamposInVol.bampoObjs.forEach(function(bampoObj) {
    var fileName = dbName + bampoObj.bampoN + '.xml';
    //fs.writeFileSync(folder + '/' + fileName, bampoObj.bampoText, 'utf8');
    console.log(fileName);
  });
});
*/