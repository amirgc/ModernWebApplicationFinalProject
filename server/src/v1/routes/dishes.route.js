"use strict";
const express = require("express"),
 router = express.Router();
const DishController = require("../controllers/dish.controller");

// get list of dishes
router.get("/dishes", DishController.FindDishes);


// exports
module.exports = router;
