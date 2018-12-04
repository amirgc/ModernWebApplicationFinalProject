"use strict";

const Promise = require("bluebird");
const repository = require("../../models/repository");
const DbConstant = require("../../utils/dbConstant");
var mongoose = require("mongoose");
var User = mongoose.model("User");

/**
 * Create a new TestData
 * @param lateFeeParams {Object}
 *  eg:
 *    {
 *     name: "name",
 *     chargeType: "flat",
 *     value: 10
 *    }
 *  @params ancestors {Array}
 *    eg:
 *      ['AncestorKind', AncestorKey]
 * @return Promise
 *  resolve{LateFee}, if new Late Fee is created
 *  reject{Error}, if late fee can't be created
 */
function createTestData(params) {
  return new Promise(function(resolve, reject) {
    let user = new User(params);
    // user.username = params.username;
    // user.password = params.password;
    return repository
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
function listTestData(params, ancestors) {
  return repository.list(TestData, params, filterableProperties, ancestors);
}

/**
 * Retrieve a test date
 * @param lateFeeParams {Object}
 *  eg:
 *    {
 *     name: "name",
 *     chargeType: "flat",
 *     value: 10
 *    }
 *  @params ancestors {Array}
 *    eg:
 *      ['AncestorKind', AncestorKey]
 * @return Promise
 *  resolve{LateFee}, if new Late Fee is created
 *  reject{Error}, if late fee can't be created
 */
function updateTestData(lateFeeParams, ancestors) {
  return new Promise(function(resolve, reject) {
    /**
     * Check whether late fee of same name exist
     */
    return listLateFee(
      {
        name: lateFeeParams["name"]
      },
      ancestors.slice()
    )
      .then(lateFeeListed => {
        if (lateFeeListed.length) {
          resolve({
            data: lateFeeListed[0],
            action: DbConstant.RETRIEVE,
            message: "Late Fee of similar name exists."
          });
        } else {
          return repository
            .create(LateFee, lateFeeParams, ancestors)
            .then(lateFeeCreated => {
              resolve({
                data: lateFeeCreated,
                action: DbConstant.CREATE
              });
            });
        }
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  createTestData,
  listTestData,
  updateTestData
};
