const _ = require("lodash");

function changeNameOperationId(swaggerSchema) {
  const swaggerSchemaClone = _.cloneDeep(swaggerSchema);
  for (const contract in swaggerSchemaClone.paths) {
    for (const verb in swaggerSchemaClone.paths[contract]) {
      swaggerSchemaClone.paths[contract][verb].operationId =
        generateNameEndpoint(verb, contract);
    }
  }
  return swaggerSchemaClone;
}

function generateNameEndpoint(verb, url) {
  const prefix = {
    get: "get",
    put: "change",
    post: "add",
    delete: "delete",
  };

  function convertUrl(url) {
    const pattern = /[^/ ]+/g;
    const patternPath = /\{(\w+)}/;

    let words = _.words(url, pattern);

    words = words
      .slice(1)
      .map((word) => {
        if (word.match(patternPath)) {
          return word.match(patternPath)[1];
        }
        return word;
      })
      .map(_.camelCase)
      .map(_.upperFirst);
    return words.join("");
  }
  return `${prefix[verb]}${convertUrl(url)}`;
}

module.exports = changeNameOperationId;
