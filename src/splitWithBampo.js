var bampoPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<bampo)))/g;
var bampoRegex = /<bampo n="(\d+[a-z]?)\.(\d+)([^<>\d][^<>]*?)?"\/>/;

function splitBampos(text) {
  var delim = '~!@#$%';
  var bampoTexts = text.replace(bampoPageRegex, delim + '$1')
    .split(delim);
  bampoTexts.splice(0, 2, bampoTexts[0].concat(bampoTexts[1]));

  return bampoTexts;
}

function splitWithBampo(volObjs) {
  var bamposInVols = volObjs.map(function(volObj) {
    var volText = volObj.volText;
    var bampoTag = volText.match(bampoRegex)

    if (! bampoTag) {
      console.log('We don\'t have bampo in vol', volObj.volN);
    }
    else {
      var bampoTexts = splitBampos(volText);

      var bampoObjs = bampoTexts.map(function(bampoText) {
        var resultObj = {};
        var firstBampoTag = bampoText.match(bampoRegex);
        var sutraId = firstBampoTag[1];
        var bampoN = firstBampoTag[2];

        resultObj['bampoN'] = sutraId + '_' + bampoN;
        resultObj['bampoText'] = bampoText;

        return resultObj;
      });

      volObj['bampoObjs'] = bampoObjs;

      return volObj;
    }
  });

  return bamposInVols;
}

module.exports = splitWithBampo;