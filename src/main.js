var firstLineIsPb = /^\s*?<pb id/;
var delim = 'IAmDelimiter';

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

function getTextsAndSplit(fileRoutes, texts, noBampoTag) {
  var texts = texts.map(addVolPbTag);
  var volTexts = toVolTexts(texts, fileRoutes[0]);
}

module.exports = getTextsAndSplit;