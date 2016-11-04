var bampoPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<bampo n="\d+[a-z]?\.\d+(\.1)?"\/>)))/g;
var bampoRegex = /<bampo n="(\d+[a-z]?)\.(\d+)(\.1)?"\/>/;
var allBampoRegex = /<bampo n="\d+[a-z]?\.\d+(\.1)?"\/>/g;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra id="[^<>]+?"\/>)))/g;
var sutraRegex = /<sutra id="[^<>]*[^\d](\d+)[^<>\d]*"\/>/;
var allSutraRegex = /<sutra id="[^<>]*[^\d]\d+[^<>\d]*"\/>/g;
var delim = '~!@#$%';

var tools = require('./tools.js');
var has = tools.has;

function bampoTextsBy(pageRegex, text) {
  var bampoTexts = text.replace(pageRegex, delim + '$1')
    .split(delim);
  bampoTexts.splice(0, 2, bampoTexts[0].concat(bampoTexts[1]));

  return bampoTexts;
}

// split with bampo tag

function objsByBampo(bampoText) {
  var bampoObj = {};
  var lastBampoTag = bampoText.match(allBampoRegex)
    .pop()
    .match(bampoRegex);

  bampoObj['bampoN'] = lastBampoTag[1] + '_' + lastBampoTag[2];
  bampoObj['bampoText'] = bampoText;

  return bampoObj;
}

function splitByBampoTag(text) {
  var bampoTexts = bampoTextsBy(bampoPageRegex, text);
  var bampoObjs = bampoTexts.map(objsByBampo);
  var lastBampoN = bampoObjs.pop().bampoN;

  return {'bampoObjs': bampoObjs, 'lastBampoN': lastBampoN};
}

// split with sutra tag

function objsBySutra(sutraText) {
  var lastSutraTag = sutraText.match(allSutraRegex)
    .pop()
    .match(sutraRegex);
  var sutraId = lastSutraTag[1];
  console.log(sutraId);
}

function splitBySutraTag(text) {
  var bampoTexts = bampoTextsBy(sutraPageRegex, text);
  var bampoObjs = bampoTexts.map(objsBySutra);
}

//

function splitWithBampo(volObjs) {
  var lastBampoN;

  var bamposInVols = volObjs.map(function(volObj) {
    var volText = volObj.volText;

    if (has(bampoRegex, volText)) {
      var objsAndBampoN = splitByBampoTag(volText);
      lastBampoN = objsAndBampoN.lastBampoN;

      return objsAndBampoN.bampoObjs;
    }
    else if (has(sutraRegex, volText)) {
      var objsAndBampoN = splitBySutraTag(volText);
      //lastBampoN = objsAndBampoN.lastBampoN;

      //return objsAndBampoN.bampoObjs;
    }
    else {

    }
  });

  return bamposInVols;
}

module.exports = splitWithBampo;