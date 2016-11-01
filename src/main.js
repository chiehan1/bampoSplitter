var firstLineIsPb = /^\s*?<pb id/;
var delim = 'IAmDelimiter';


var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

function addVolPbTag(text) {
  return firstLineIsPb.test(text) ? text : '<pb id="volpage"/>\n' + text;
}

function toVolTexts(texts) {
  return texts.join('\n')
    .replace(/(<pb id="volpage")/g, delim + '$1')
    .split(delim);
}

function getTextsAndSplit(texts, noBampoTag) {
  var texts = texts.map(addVolPbTag);
  var volTexts = toVolTexts(texts);
  console.log(volTexts[1]);
}

module.exports = getTextsAndSplit;