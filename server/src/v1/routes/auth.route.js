"use strict";

const express = require("express"),
  router = express.Router();

const AuthController = require("../controllers/auth.controller");
//router.get("/test", AuthController.listTestData);
router.post("/register", AuthController.CreateUser);
module.exports = router;
