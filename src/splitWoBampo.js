var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra)))/g;
var delim = 'IAmDelimiter';
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

var tools = require('./helper.js');
var has = tools.has;

function splitBySutraPage(volText) {
  return volText.replace(sutraPageRegex, delim + '$1')
    .split(delim);
}

function splitWoBampo(fileRoutes, volObjs) {
  var sutraId;

  volObjs.forEach(function(volObj) {
    var volText = volObj.volText;
    var texts = splitBySutraPage(volText);

/*    sutraTexts.forEach(function(sutraText) {
      if ()
    });
*/
    console.log(texts.length === 1 || texts[0]);
  });
}

module.exports = splitWoBampo;