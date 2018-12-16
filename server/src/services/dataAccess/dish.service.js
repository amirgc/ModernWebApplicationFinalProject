var mongoose = require("mongoose");
var Dish = mongoose.model("Dishes");
var config = require("../../../config/config");
var repository = require("../../models/repository");

/**
 * Create a new dish by given information in request
 * @param {*} req 
 */
function createDish(req) {
  return new Promise(function(resolve, reject) {
    console.log("auth service createUser");
    let dish = new Dish({
      name: req.body.name,
      description: req.body.description,
      orderingPosition: req.body.orderingPosition,
      uom: req.body.uom,
      category: req.body.category,
      types: req.body.types
    });

    repository.create(dish);
    
  });
}

/**
 * Find a dish by given id
 * @param {*} req 
 */
function findDishById(req) {
  // return new Promise(function(resolve, reject) {
  //   Dish.findById(req.name, function(err, dish) {
  //     if (err) reject("There was a problem finding the dish: " + err);
  //     if (!dish) reject("No dish found.");
  //     resolve(dish);
  //   });
  // });
  return repository.retrieve(Dish, req.name);
}

/**
 * Update a dish by given information in request
 * @param {*} req 
 */
function updateDishById(req) {
  // return new Promise(function(resolve, reject){
  //   Dish.updateDishById(req, function(err, dish){
  //     if(err) reject("There was a problem updating the dish: " + err);
  //     if(!dish) reject("No dish found.");
  //     resolve(dish);
  //   })
  // })
  return repository.update(Dish, req.name);
}

/**
 * Retrieve all dishes.
 */
function getAll() {
  console.log("Dish Service -- getAll()")
  return new Promise(function(resolve, reject) {
    Dish.find({}, function(err, data){
      console.log(data);
      resolve({status:200, data:data});
    })
  })
}

function removeDish(req) {
  // return new Promise(function(resolve, reject) {
  //   Dish.deleteOne(req.name, function(err, dish){
  //     if(err) reject("There was a problem deleting the dish: " + err);
  //     if(!dish) reject("No dish found.");
  //     resolve(dish);
  //   })
  // })
  repository.remove(Dish, req.name);
}

module.exports = { createDish, findDishById, updateDishById, getAll, removeDish };
