"use strict";
const express = require("express"),
 router = express.Router();
const DishController = require("../controllers/dish.controller");

// get list of dishes
router.get("/dishes", DishController.FindDishes);
// create a new dish
router.post("/dishes/create", DishController.CreateDish);
// get a dish by id
router.get("/dishes/:id", DishController.FindDishById);
// update a dish by id
router.post("/dishes/update/:id", DishController.UpdateDish);

// exports
module.exports = router;