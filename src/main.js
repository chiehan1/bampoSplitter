const firstLineIsPb = /^\s*?<pb id/;
const delim = 'IAmDelimiter';
const volRegex = /<vol n="([\d-\.]+?)"[^<>]+?>/;
const pbRegex = /<pb id="[\d-\.]+?[^<>]+?\/>/;
const sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

import splitWoBampo from './splitWoBampo.js';
import splitWithBampo from './splitWithBampo.js';
import repeatBampoN from './repeatBampoN.js';

let addVolPbTag = (text) => {
  return firstLineIsPb.test(text) ? text : '<pb id="volpage"/>\n' + text;
};

let toVolTexts = (wholeText, firstFile) => {
  var volTexts = wholeText.replace(/(<pb id="volpage")/g, delim + '$1')
    .split(delim);

  if (volTexts[0].trim()) {
    console.log('We don\'t know what volumn the first file belongs to.\nPlease check', firstFile);
  }
  else {
    volTexts.shift();
    return volTexts;
  }
};

let toVolObjs = (volTexts) => {
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

let verifyAndSplit = (fileRoutes, texts, noBampoTag) => {
  var texts = texts.map(addVolPbTag);
  var wholeText = texts.join('\n');
  var volTexts = toVolTexts(wholeText, fileRoutes[0]);
  var volObjs = toVolObjs(volTexts);
  var bamposInVols;

  if (noBampoTag) {
    var sutraTagInFirstVol = volObjs[0].volText.match(sutraRegex);

    if (sutraTagInFirstVol) {
      bamposInVols = splitWoBampo(volObjs);
    }
    else {
      console.log('We can\'t split without bampo if no sutra tag in first volumn.');
    }
  }
  else {
    var firstVolText = volObjs[0].volText;
    var hasNormalBampoTag = firstVolText.match(/<bampo n="\d+\.\d+"\/>/);
    var has3numberBampoTag = firstVolText.match(/<bampo n="\d+\.\d+\.1"\/>/);

    var sutraOrBampoTagInFirstVol = hasNormalBampoTag || has3numberBampoTag;

    if (sutraOrBampoTagInFirstVol) {
      bamposInVols = splitWithBampo(volObjs);
    }
    else {
      console.log('We can\'t split with bampo if no starting bampo tag in first volumn.');
    }
  }

  var repeatBampoNInfo = repeatBampoN(bamposInVols);

  if (repeatBampoNInfo) {
    console.log('We have repeat bampoN:', repeatBampoNInfo);
  }
  else {
    return bamposInVols;
  }
};

module.exports = verifyAndSplit;