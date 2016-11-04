var bampoPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<bampo n="\d+[a-z]?\.\d+(\.1)?"\/>)))/g;
var bampoRegex = /<bampo n="(\d+[a-z]?)\.(\d+)(\.1)?"\/>/;
var allBampoRegex = /<bampo n="\d+[a-z]?\.\d+(\.1)?"\/>/g;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra id="[^<>]+?"\/>)))/g;
var sutraRegex = /<sutra id="[^<>]*[^\d](\d+)[^<>\d]*"\/>/;
var allSutraRegex = /<sutra id="[^<>]*[^\d]\d+[^<>\d]*"\/>/g;
var delim = '~!@#$%';

var tools = require('./tools.js');
var has = tools.has;

function textsBy(pageRegex, originalText) {
  var texts = originalText.replace(pageRegex, delim + '$1')
    .split(delim);
  texts.splice(0, 2, texts[0].concat(texts[1]));

  return texts;
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
  var bampoTexts = textsBy(bampoPageRegex, text);
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
  var bampoTexts = textsBy(sutraPageRegex, text);
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