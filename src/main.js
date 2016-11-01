var firstLineIsPb = /^\s*?<pb id/;
var delim = 'IAmDelimiter';
var volRegex = /<vol n="([\d-\.]+?)"[^<>]+?>/;
var pbRegex = /<pb id="[\d-\.]+?[^<>]+?\/>/;

var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

function addVolPbTag(text) {
  return firstLineIsPb.test(text) ? text : '<pb id="volpage"/>\n' + text;
}

function toVolTexts(texts, firstFile) {
  var volTexts = texts.join('\n')
    .replace(/(<pb id="volpage")/g, delim + '$1')
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

function getTextsAndSplit(fileRoutes, texts, noBampoTag) {
  var texts = texts.map(addVolPbTag);
  var volTexts = toVolTexts(texts, fileRoutes[0]);
  var volObjs = toVolObjs(volTexts);
}

module.exports = getTextsAndSplit;