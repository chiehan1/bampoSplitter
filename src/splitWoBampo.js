var sutraRegex = /<sutra id="[^<>]*(\d+)[^<>\d]*"\/>/;

function splitWoBampo(fileRoutes, volObjs) {
  var result = volObjs[0].volText.match(sutraRegex)[1];
  console.log(result);
}

module.exports = splitWoBampo;