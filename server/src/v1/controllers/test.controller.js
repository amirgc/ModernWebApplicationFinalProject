"use strict";

const TestService = require("../../services/dataAccess/test.service");
const DbConstant = require("../../utils/dbConstant").kind;

function createTestData(req, res, next) {
  TestService.createTestData(req.body)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      next(err);
    });
}

function listTestData(req, res, next) {
  TestService.listTestData()
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      next(err);
    });
}

function updateTestData(req, res, next) {}
function deleteTestData(req, res, next) {}

module.exports = {
  createTestData,
  listTestData,
  updateTestData,
  deleteTestData
};
