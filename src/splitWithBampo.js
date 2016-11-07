var bampoPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<bampo n="\d+[a-z]?\.\d+(\.1)?"\/>)))/g;
var bampoRegex = /<bampo n="(\d+[a-z]?)\.(\d+)(\.1)?"\/>/;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra id="[^<>]+?"\/>)))/g;
var sutraRegex = /<sutra id="[^<>]*[^\d](\d+)[^<>\d]*"\/>/;
var pbRegex = /(<pb id="[^<>]+?"\/>)/g;
var delim = '~!@#$%';

// global functions

var tools = require('./tools.js');
var has = tools.has;

function textsBy(pageRegex, originalText) {
  var texts = originalText.replace(pageRegex, delim + '$1')
    .split(delim);
  texts.splice(0, 2, texts[0].concat(texts[1]));

  return texts;
}

function objsBy40pages(sutraId, lastCount, text) {
  var bampoObjs = [];
  var pages = textsBy(pbRegex, text);

  do {
    lastCount ++;
    var bampoObj = {};
    bampoObj['bampoText'] = pages.splice(0, 40)
      .join('');
    bampoObj['bampoN'] = sutraId + '_' + lastCount;
    bampoObjs.push(bampoObj);
  }
  while (pages.length > 0);

  return bampoObjs;
}

// split by bampo tag

function objsByBampo(bampoText) {
  var bampoObj = {};
  var finalBampoTag = bampoText.match(new RegExp(bampoRegex, 'g'))
    .pop()
    .match(bampoRegex);

  bampoObj['bampoN'] = finalBampoTag[1] + '_' + finalBampoTag[2];
  bampoObj['bampoText'] = bampoText;

  return bampoObj;
}

function splitByBampoTag(text) {
  var bampoTexts = textsBy(bampoPageRegex, text);
  var bampoObjs = bampoTexts.map(objsByBampo);
  var lastBampoN = bampoObjs[bampoObjs.length - 1].bampoN;

  return {'bampoObjs': bampoObjs, 'lastBampoN': lastBampoN};
}

// split by sutra tag

function objsBySutra(sutraText) {
  var finalSutraTagInfo = sutraText.match(new RegExp(sutraRegex, 'g'))
    .pop()
    .match(sutraRegex);

  return objsBy40pages(finalSutraTagInfo[1], 0, sutraText);
}

function splitBySutraTag(text) {
  var bampoTexts = textsBy(sutraPageRegex, text);
  var bampoObjsInSutras = bampoTexts.map(objsBySutra);
  var bampoObjs = bampoObjsInSutras.reduce(function(arr1, arr2) {
    return arr1.concat(arr2);
  });
  var lastBampoN = bampoObjs[bampoObjs.length - 1].bampoN;

  return {'bampoObjs': bampoObjs, 'lastBampoN': lastBampoN};
}

// split as (1 bampo / 40 pages) 

function splitBy40Pages(lastBampoN, text) {
  var lastBampoInfo = lastBampoN.match(/(\d+[a-z])\.(\d+)/);
  var bampoObjs = splitBy40Pages(lastBampoInfo[1], lastBampoInfo[2], text);
  var lastBampoN = bampoObjs[bampoObjs.length - 1].bampoN;

  return {'bampoObjs': bampoObjs, 'lastBampoN': lastBampoN};
}

// main code

function splitWithBampo(volObjs) {
  var lastBampoN;

  var bamposInVols = volObjs.map(function(volObj) {
    var volText = volObj.volText;

    if (has(bampoRegex, volText)) {
      var objsAndBampoN = splitByBampoTag(volText);
    }
    else if (has(sutraRegex, volText)) {
      var objsAndBampoN = splitBySutraTag(volText);
    }
    else {
      var objsAndBampoN = splitBy40Pages(volText);
    }

    lastBampoN = objsAndBampoN.lastBampoN;
    volObj['bampoObjs'] = objsAndBampoN.bampoObjs;

    return volObj;
  });

  return bamposInVols;
}

module.exports = splitWithBampo;