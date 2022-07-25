module.exports = {
  "flow-coordinator": {
    input: "./flow.yaml",
    output: {
      target: "./repositories",
      mode: "tags-split",
      schemas: "./models",
      client: "react-query",
      clean: true,
      override: {
        useDates: true,
        mutator: {
          path: "./helpers/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
};
