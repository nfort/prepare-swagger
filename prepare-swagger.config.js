/*
 * config
 *   override
 *     definition: (definition) => definition
 *
 * */
module.exports = {
  override: {
    definition: {
      DeliveryComplete: (definition) => {
        return definition;
      },
    },
  },
};
