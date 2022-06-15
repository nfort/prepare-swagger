const _ = require("lodash");

function removeQueryParameters(swaggerScheme) {
  const swaggerSchemeClone = _.cloneDeep(swaggerScheme);
  for (const path in swaggerSchemeClone.paths) {
    const obj = swaggerSchemeClone.paths[path];
    swaggerSchemeClone.paths[path.replace(/\{\?.*\}/g, "")] = obj;
    delete swaggerSchemeClone.paths[path];
  }
  return swaggerSchemeClone;
}

module.exports = removeQueryParameters;
