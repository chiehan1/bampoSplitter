var firstLineIsPb = /^\s*?<pb id/;
var delim = 'IAmDelimiter';
var volRegex = /<vol n="([\d-\.]+?)"[^<>]+?>/;
var pbRegex = /<pb id="[\d-\.]+?[^<>]+?\/>/;
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

var splitWoBampo = require('./splitWoBampo.js');

function addVolPbTag(text) {
  return firstLineIsPb.test(text) ? text : '<pb id="volpage"/>\n' + text;
}

function toVolTexts(wholeText, firstFile) {
  var volTexts = wholeText.replace(/(<pb id="volpage")/g, delim + '$1')
    .split(delim);

  if (volTexts[0].trim()) {
    console.log('We don\'t know what volumn the first file belongs to.\nPlease check', firstFile);
  }
  else {
    volTexts.shift();
    return volTexts;
  }
}

function toVolObjs(volTexts) {
  var results = [];
  for (var i = 0; i < volTexts.length; i++) {
    var text = volTexts[i];
    var volTag = text.match(volRegex);

    if (! volTag) {
      console.log('We can\'t find volumn tag before', text.match(pbRegex)[0]);
    }
    else {
      var volN = volTag[1];
      results.push({'volN': volN, 'volText': text});
    }
  }
  return results;
}

function has(regex, str) {
  return regex.test(str);
}

function getTextsAndSplit(fileRoutes, texts, noBampoTag) {
  var texts = texts.map(addVolPbTag);
  var wholeText = texts.join('\n');
  var volTexts = toVolTexts(wholeText, fileRoutes[0]);
  var volObjs = toVolObjs(volTexts);
  noBampoTag = true;

  if (noBampoTag) {
    if (has(sutraRegex, wholeText)) {
      splitWoBampo(fileRoutes, volObjs);
    }
    else {
      console.log('We can\'t split without bampo if no sutra tag in all texts.')
    }
  }
}

module.exports = getTextsAndSplit;