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
  console.log("List called");
  TestService.retrieveTestData(req.params.latefeeId, [
    DbConstant.COMPANY,
    parseInt(req.user.company.id)
  ])
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      next(err);
    });
}

function retrieveTestData(req, res, next) {
  console.log("retrieve called");
  TestService.retrieveTestData(req.params.latefeeId, [
    DbConstant.COMPANY,
    parseInt(req.user.company.id)
  ])
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      next(err);
    });
}

function updateLateFee(req, res, next) {
  LateFeeService.updateLateFee(req.body.id, req.body, [
    DbConstant.COMPANY,
    parseInt(req.user.company.id)
  ])
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  createTestData,
  listTestData,
  retrieveTestData,
  updateLateFee
};
