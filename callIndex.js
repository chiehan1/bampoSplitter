var noBampoTag = process.argv[2];
var routesForGlob = './unSplittedTexts/**/*.*(txt|xml)';
var outputFolder = './splittedFolders';

// modules

var glob = require('glob');
var mkdirp = require('mkdirp');
var fs = require('fs');
var makeBampos = require('./index.js');

// process

var fileRoutes = glob.sync(routesForGlob, {'nosort': true});
var texts = fileRoutes.map(function(route) {
  return fs.readFileSync(route, 'utf8');
});

var bampos = makeBampos(texts, noBampoTag);

//console.log(bampos);