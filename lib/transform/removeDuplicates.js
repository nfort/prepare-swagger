const _ = require("lodash");

const regexpQueryParams = /\{\?.*}$/g;

function removeDuplicates(swaggerScheme) {
  const swaggerSchemeClone = _.cloneDeep(swaggerScheme);
  const paths = swaggerSchemeClone.paths;

  for (const path of Object.keys(paths)) {
    const pathWithoutParams = path.replace(regexpQueryParams, "");
    let flag = false;

    Object.keys(paths).forEach((_path) => {
      if (!paths.hasOwnProperty(path)) return;

      if (
        path !== _path &&
        pathWithoutParams === _path.replace(regexpQueryParams, "")
      ) {
        if (paths[_path].get && paths[path].get) {
          const p = Object.values(paths[_path].get.parameters)
            .filter((p) => p.in === "query")
            .map((p) => {
              p.required = false;
              return p;
            });
          const parameters = _.uniqBy(
            [...Object.values(paths[path].get.parameters), ...p],
            "name"
          );
          paths[path].get.parameters = parameters;
          paths[pathWithoutParams] = {
            ...paths[pathWithoutParams],
            ...paths[path],
          };
          delete paths[_path];
          flag = true;
        }
      }
    });

    if (flag) {
      delete paths[path];
    }
  }

  return swaggerSchemeClone;
}

module.exports = removeDuplicates;
