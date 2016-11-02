var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra)))/g;
var delim = 'IAmDelimiter';
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;
var allSutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/g;

var tools = require('./helper.js');
var has = tools.has;

function splitBySutraPage(volText) {
  var resultTexts = volText.replace(sutraPageRegex, delim + '$1')
    .split(delim);

  return resultTexts[0].trim() ? resultTexts : resultTexts.slice(1);
}

function splitWoBampo(fileRoutes, volObjs, sutraId) {
  volObjs.forEach(function(volObj) {
    var volText = volObj.volText;
    var texts = splitBySutraPage(volText);
/*
    texts.forEach(function(text) {

      if (has(sutraRegex, text)) {
        var sutraIds = text.match(allSutraRegex);
        if (1 === sutraIds.length) {
          sutraId = sutraIds[0].match(sutraRegex)[1];
        }
        var firstSutraIds = sutraIds[0];
        var lastSutraIds = sutraIds[sutraIds.length - 1];
      }
    });
*/
    console.log(texts.length === 1 || texts[0]);
  });
}

module.exports = splitWoBampo;