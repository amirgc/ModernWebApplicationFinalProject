"use strict";
var VerifyToken = require("../../../helpers/VerifyToken");
const express = require("express"),
  router = express.Router();

const AuthController = require("../controllers/auth.controller");
router.post("/login", AuthController.Login);
router.post("/register", AuthController.CreateUser);
router.get("/verifyToken", VerifyToken, AuthController.FindUserById);
module.exports = router;
