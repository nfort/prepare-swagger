#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const pipe = require("lodash/fp/pipe");
const axios = require("axios");

const addMetainfo = require("../lib/transform/addMetainfo");
const removeDuplicates = require("../lib/transform/removeDuplicates");
const changeNameOperationId = require("../lib/transform/changeNameOperationId");
const removeDuplicatesEndpoint = require("../lib/transform/removeDuplicatesEndpoint");
const removeQueryParameters = require("../lib/transform/removeQueryParameters");
const allDifinitionRequired = require("../lib/transform/allDefinitionRequired");

const args = process.argv.splice(2);
const url = args[0];
const filePath = path.resolve("./prepare-swagger.config.js");
let config;

if (!url) {
  console.error("Не определен url в качестве аргумента");
  process.exit(1);
}

fs.stat(filePath, (err) => {
  if (!err) {
    config = require(filePath);
  }
});

axios.get(url).then((response) => {
  const swaggerScheme = response.data;
  const bindConfigAllDefinitionsRequired = allDifinitionRequired(config);

  const f = pipe(
    addMetainfo,
    removeDuplicatesEndpoint,
    removeDuplicates,
    removeQueryParameters,
    changeNameOperationId,
    bindConfigAllDefinitionsRequired
  );
  const changedSwaggerSchema = f(swaggerScheme);

  fs.writeFile(
    "flow.yaml",
    yaml.dump(changedSwaggerSchema, { noRefs: true }),
    (error) => {
      if (error) {
        console.error("Не удалось сохранить файл с обновленом контрактом");
      }
    }
  );
});
