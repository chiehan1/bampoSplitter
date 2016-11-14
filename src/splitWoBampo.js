var sutraRegex = /<sutra id="[^<>]*[^\d](\d+[^<>\d]*)"\/>/;
var sutraPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<sutra)))/g;
var delim = 'IAmDelimiter';
var sutraRegex = /<sutra id="[^<>]*[^\d](\d+[^<>\d]*)"\/>/;
var allSutraRegex = /<sutra id="[^<>]*\d+[^<>\d]*"\/>/g;

function splitBySutraPage(volText) {
  var resultTexts = volText.replace(sutraPageRegex, delim + '$1')
    .split(delim);
  resultTexts.splice(0, 2, resultTexts[0].concat(resultTexts[1]));

  return resultTexts;
}

function toPages(text) {
  var resultTexts = text.replace(/(<pb id)/g, delim + '$1')
    .split(delim);
  resultTexts.splice(0, 2, resultTexts[0].concat(resultTexts[1]));

  return resultTexts;
}

function splitWoBampo(volObjs) {
  var sutraId, bampoCount;

  volObjs.map(function(volObj) {
    var bampoObjs = [];
    var volText = volObj.volText;
    var hasSutraTag = volText.match(sutraRegex);

    if (hasSutraTag) {
      var sutraTexts = splitBySutraPage(volText);

      sutraTexts.forEach(function(sutraText) {
        var sutraTags = sutraText.match(allSutraRegex);
        sutraId = Number(sutraTags[sutraTags.length - 1].match(sutraRegex)[1]);

        bampoCount = 1;
        var pages = toPages(sutraText);

        while(pages.length > 0) {
          var resultObj = {};
          var bampoText = pages.splice(0, 40)
            .join('');
          var bampoN = sutraId + '_' + bampoCount;
          resultObj['bampoN'] = bampoN;
          resultObj['bampoText'] = bampoText;
          bampoObjs.push(resultObj);
          bampoCount ++;
        }
      });
    }
    else {
      var pages = toPages(volText);

      while(pages.length > 0) {
        var resultObj = {};
        var bampoText = pages.splice(0, 40)
          .join('');
        var bampoN = sutraId + '_' + bampoCount;
        resultObj['bampoN'] = bampoN;
        resultObj['bampoText'] = bampoText;
        bampoObjs.push(resultObj);
        bampoCount ++;
      }
    }
    volObj.bampoObjs = bampoObjs;
    return volObj;
  });
  return volObjs;
}

module.exports = splitWoBampo;