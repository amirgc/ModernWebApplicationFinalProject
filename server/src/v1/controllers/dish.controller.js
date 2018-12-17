"use strict";

const DishService = require("../../services/dataAccess/dish.service");
const DbConstant = require("../../utils/dbConstant").kind;

/**
 * Create a new dish based on information in request
 * @param {*} req 
 * @param {*} res 
 */
function CreateDish(req, res) {
  console.log("Creating Dish -- start log" + Date.now()) ;
  console.log(req);
  console.log("Creating Dish -- end log" + Date.now()) ;
  DishService.createDish(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => res.status(500).send(err));
}

/**
 * Get a dish by given id in request
 * @param {*} req 
 * @param {*} res 
 */
function FindDishById(req, res) {
  console.log("Find Dish By given ID");
  DishService.findDishById(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => res.status(500).send("fail"));
}

/**
 * Get all dishes
 * @param {*} req 
 * @param {*} res 
 */
function FindDishes(req, res) {
  console.log("Finding dishes");
  DishService.getAll(req)
  .then(data => {
    res.status(200).send(JSON.stringify(data));
  })
  .catch(err => res.status(500).send("fail"));
}

/**
 * Update the given dish
 * @param {*} req 
 * @param {*} res 
 */
function UpdateDish(req, res) {
  console.log("Updating dish");
  DishService.updateDishById(req)
  .then(data => {
    res.status(200).send(JSON.stringify(data));
  })
  .catch(err => res.status(500).send("Updating fail"));
}

function RemoveDish(req, res) {
  console.log("Removing dish");
  DishService.removeDish(req)
  .then(data => {
    res.status(200).send(JSON.stringify(data));
  })
  .catch(err => res.status(500).send("Removing fail"));
}

module.exports = {
  CreateDish,
  FindDishById,
  FindDishes,
  UpdateDish,
  RemoveDish
};
