const _ = require("lodash");

const patternQueryParameter = /\{\?.*\}/g;

function removeQueryParameters(swaggerScheme) {
  const swaggerSchemeClone = _.cloneDeep(swaggerScheme);

  for (const path in swaggerSchemeClone.paths) {
    const currentPath = swaggerSchemeClone.paths[path];
    if (path.match(patternQueryParameter)) {
      swaggerSchemeClone.paths[path.replace(/\{\?.*\}/g, "")] = currentPath;
      delete swaggerSchemeClone.paths[path];
    }
  }

  return swaggerSchemeClone;
}

module.exports = removeQueryParameters;
