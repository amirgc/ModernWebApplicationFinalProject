"use strict";

const AuthService = require("../../services/dataAccess/auth.service");
const DbConstant = require("../../utils/dbConstant").kind;

function CreateUser(req, res) {
  console.log("auth createUser")
  AuthService.createUser(req)
    .then(function(err, token) {
      if (err)
        return res
          .status(500)
          .send(err);
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => res.status(500).send(err));
}

module.exports = {
  CreateUser
};
