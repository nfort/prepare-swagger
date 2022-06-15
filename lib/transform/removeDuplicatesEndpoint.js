const _ = require("lodash");

function removeDuplicatesEndpoint(swaggerScheme) {
  const swaggerSchemeCopy = _.cloneDeep(swaggerScheme);
  for (const path in swaggerSchemeCopy.paths) {
    if (path.match(/^\/api\//)) {
      delete swaggerSchemeCopy.paths[path];
    }
  }
  return swaggerSchemeCopy;
}

module.exports = removeDuplicatesEndpoint;
