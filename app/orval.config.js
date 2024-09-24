const { url } = require("inspector");
const { mock } = require("node:test");

module.exports = {
  "xiv-craftmanship-api": {
    input: {
      target: "http://localhost:8080/openapi.yaml",
    },
    output: {
      target: "./src/openapi/xiv-craftmanship-api.ts",
      client: "react-query",
    },
  },
};
