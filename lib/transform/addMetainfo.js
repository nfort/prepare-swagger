const _ = require("lodash");

function addMetaInfo(swaggerScheme) {
  const swaggerSchemeClone = _.cloneDeep(swaggerScheme);

  swaggerSchemeClone.info.version = "1.0.0";
  swaggerSchemeClone.host = "lgs.hostname";

  return swaggerSchemeClone;
}

module.exports = addMetaInfo;
