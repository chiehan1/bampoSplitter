var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra)))/g;
var delim = 'IAmDelimiter';
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;
var allSutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/g;

var tools = require('./helper.js');
var has = tools.has;

function splitBySutraPage(volText) {
  return volText.replace(sutraPageRegex, delim + '$1')
    .split(delim);
}

function splitWoBampo(fileRoutes, volObjs, sutraId) {

  volObjs.forEach(function(volObj) {
    var volText = volObj.volText;
    var texts = splitBySutraPage(volText);
/*
    texts.forEach(function(text) {
      if (sutraId) {

      }

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