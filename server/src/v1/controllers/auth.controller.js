"use strict";

const AuthService = require("../../services/dataAccess/auth.service");
const DbConstant = require("../../utils/dbConstant").kind;

function CreateUser(req, res) {
  console.log("auth createUser");
  AuthService.createUser(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => res.status(500).send(err));
}

function Login(req, res) {
  console.log("auth login");
  AuthService.login(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => res.status(500).send("fail"));
}

function FindUserById(req, res) {
  console.log("auth FindUserById");
  AuthService.findUserById(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => res.status(500).send("fail"));
}

module.exports = {
  CreateUser,
  Login,
  FindUserById
};
