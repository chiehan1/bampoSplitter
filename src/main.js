var prePageTag = '<pb id="prePage"/>\n';
var emptyPrePageRegex = new RegExp(prePageTag + '\\s*', 'g');
var delim = '~!iamdelim~!';
var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

function split20Page(pages) {
  var results = [];
  pages.forEach(function(page) {

  });
}

function notEmptyPrePage(str) {
  var rmPbNl = str.replace(emptyPrePageRegex, '')
    .replace(/\s/g, '');
  return rmPbNl !== '';
}

function paging(strs) {
  return (prePageTag + strs.join(prePageTag))
    .replace(/(<pb)/g, delim + '$1')
    .split(delim)
    .filter(notEmptyPrePage);
}

function getTextsAndSplit(texts, noBampoTag) {
  var pages = paging(texts);

  if (noBampoTag) {

  }
}

module.exports = getTextsAndSplit;