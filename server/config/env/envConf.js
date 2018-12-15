"use strict";

const nconf = (module.exports = require("nconf"));
const path = require("path");
const requiredParams = ["PORT"];

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env(requiredParams)
  // 3. Config file
  .file({
    file: path.join(__dirname, `${process.env.NODE_ENV}.json`)
  })
  // 4. Defaults
  .defaults({
    // default values
  });

requiredParams.forEach(function(param) {
  checkConfig(param);
});

function checkConfig(envVariable) {
  if (!nconf.get(envVariable)) {
    throw new Error(
      `You must set the ${envVariable} environment variable or add it to config/env/${
        process.env.NODE_ENV
      }.json!`
    );
  }
}
