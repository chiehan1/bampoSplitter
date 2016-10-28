var prePageTag = '<pb id="prePage"/>\n';
var emptyPrePageRegex = new RegExp(prePageTag + '\\s*', 'g');
var delim = '~!iamdelim~!';
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;



function notEmptyPrePage(str) {
  var rmPbNl = str.replace(emptyPrePageRegex, '')
    .replace(/\s/g, '');
  return rmPbNl !== '';
}

function getTextsAndSplit(texts, noBampoTag) {
  var wholeText = prePageTag + texts.join(prePageTag);
  var pages = wholeText.replace(/(<pb)/g, delim + '$1')
    .split(delim)
    .filter(notEmptyPrePage);

  if (noBampoTag) {

  }
}

module.exports = getTextsAndSplit;