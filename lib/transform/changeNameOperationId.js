const _ = require("lodash");

function changeNameOperationId(swaggerSchema) {
  const swaggerSchemaClone = _.cloneDeep(swaggerSchema);

  for (const contract in swaggerSchemaClone.paths) {
    for (const verb in swaggerSchemaClone.paths[contract]) {
      swaggerSchemaClone.paths[contract][verb].operationId =
        generateOperationId(verb, contract);
    }
  }

  return swaggerSchemaClone;
}

function generateOperationId(verb, url) {
  const prefix = {
    get: "get",
    put: "change",
    post: "add",
    delete: "delete",
  };

  function convertUrl(url) {
    const patternDelimeter = /[^/ ]+/g;
    const patternPath = /\{(\w+)}/;

    let slugs = _.words(url, patternDelimeter);

    slugs = slugs
      .slice(1)
      .map((slug) => {
        if (slug.match(patternPath)) {
          return slug.match(patternPath)[1];
        }
        return slug;
      })
      .map(_.camelCase)
      .map(_.upperFirst);
    return slugs.join("");
  }

  return `${prefix[verb]}${convertUrl(url)}`;
}

module.exports = changeNameOperationId;
