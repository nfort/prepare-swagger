const _ = require("lodash");

function allDifinitionRequired(swaggerScheme) {
  const swaggerSchemeClone = _.cloneDeep(swaggerScheme);
  for (const definition in swaggerSchemeClone.definitions) {
    const obj = swaggerSchemeClone.definitions[definition];
    if (obj.properties) {
      obj.required = Object.keys(obj.properties);
    }
  }
  return swaggerSchemeClone;
}

module.exports = allDifinitionRequired;
