"use strict";

const express = require("express"),
  router = express.Router();

const TestController = require("../controllers/test.controller");
router.get("/test", TestController.listTestData);
router.post("/test", TestController.createTestData);
module.exports = router;
