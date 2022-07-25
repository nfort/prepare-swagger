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
    put: "update",
    post: "create",
    delete: "delete",
  };

  function changeUrl(url) {
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

  return `${prefix[verb]}${changeUrl(url)}`;
}

module.exports = changeNameOperationId;
