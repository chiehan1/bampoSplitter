function repeatBampoN(bamposInVols) {
  var repeatN = false;
  var bampoNs = {};

  bamposInVols.forEach(function(volObj) {
    volObj.bampoObjs.forEach(function(bampoObj) {
      var bampoN = bampoObj.bampoN;
      if (! bampoNs[bampoN]) {
        bampoNs[bampoN] = true;
      }
      else {
        repeatN = bampoN;
      }
    });
  });

  return repeatN;
}

module.exports = repeatBampoN;