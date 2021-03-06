const _ = require("lodash");

function allDifinitionRequired(config = {}) {
  const overrideForDefinition = config?.override?.definition;
  return (swaggerScheme) => {
    const swaggerSchemeClone = _.cloneDeep(swaggerScheme);

    for (const definition in swaggerSchemeClone.definitions) {
      const obj = swaggerSchemeClone.definitions[definition];

      if (overrideForDefinition) {
        const shouldOverride = overrideForDefinition.hasOwnProperty(definition);
        if (shouldOverride) {
          overrideForDefinition[definition](obj);
          continue;
        }
      }

      if (obj.properties) {
        obj.required = Object.keys(obj.properties);
      }
    }

    return swaggerSchemeClone;
  };
}

module.exports = allDifinitionRequired;
