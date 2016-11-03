var bampoPageRegex = /(<pb id[^<>]+?>(?=([\s\S](?!<pb))*?(?=<bampo)))/g;
var bampoRegex = /<bampo n=""\/>/g;

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
    if (volText)
    var bampoTexts = volText.map(splitBampos);

    bampoTexts.forEach(function(bampoText) {

    });
  });
  return;
}

module.exports = splitWithBampo;