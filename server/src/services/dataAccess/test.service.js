"use strict";

const Promise = require("bluebird");
const repository = require("../../models/repository");
const DbConstant = require("../../utils/dbConstant");
var mongoose = require("mongoose");
var User = mongoose.model("User");

/**
 * Create a new TestData
 * @param userParams {Object}
 *  eg:
 *    {
 *     name: "name",
 *     chargeType: "flat",
 *     value: 10
 *    }
 * @return Promise
 *  resolve{LateFee}, if new Late Fee is created
 *  reject{Error}, if late fee can't be created
 */
function createTestData(params) {
  return new Promise(function(resolve, reject) {
    let user = new User(params);
    repository
      .create(user)
      .then(data => {
        resolve({
          data: data,
          action: DbConstant.CREATE
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * List all test Data
 * @return Promise
 *  resolve{test data}
 *   */
function listTestData() {
  let params = {
    limit: 10
  };
  return new Promise(function(resolve, reject) {
    repository
      .list(User, params)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

/**
 * Retrieve a test date
 * @param testdata {Object}
 *  eg:
 *    {
 *     name: "name",
 *     chargeType: "flat",
 *     value: 10
 *    }
 * @return Promise
 *  resolve{testdata}, if test data is updated
 *  reject{Error}, if test data can't be updated
 */
function updateTestData(lateFeeParams) {
  return new Promise(function(resolve, reject) {
    repository
      .update({})
      .then(lateFeeListed => {
        console.log(updatedData);
        resolve(updatedData);
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  createTestData,
  listTestData,
  updateTestData
};
