var bampoPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<bampo)))/g;
var bampoRegex = /<bampo n="(\d+[a-z]?)\.(\d+)([^<>\d][^<>]*?)?"\/>/;
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

function split2Bampos(text) {
  var delim = '~!@#$%';
  var bampoTexts = text.replace(bampoPageRegex, delim + '$1')
    .split(delim);
  bampoTexts.splice(0, 2, bampoTexts[0].concat(bampoTexts[1]));

  return bampoTexts;
}

function splitWithBampo(volObjs) {
  var sutraId;
  var bampoCount;

  var bamposInVols = volObjs.map(function(volObj) {
    var volText = volObj.volText;
    var bampoTag = volText.match(bampoRegex);
    var sutraTag = volText.match(sutraRegex);

    if (bampoTag) {
      var bampoObjs = split2Bampos(volText);
    }
    else if (sutraTag) {

    }
    else {

    }
  });

  return bamposInVols;
}

module.exports = splitWithBampo;