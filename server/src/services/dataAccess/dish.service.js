var mongoose = require("mongoose");
var Dish = mongoose.model("Dishes");
var config = require("../../../config/config");
var repository = require("../../models/repository");
var url = require("url");

/**
 * Create a new dish by given information in request
 * @param {*} req
 */
function createDish(data) {
  console.log("starting log -- createDish");
  console.log(data);
  let dish = new Dish(data);

  return repository.create(dish);
}

/**
 * Find a dish by given id
 * @param {*} req
 */
function findDishById(req) {
  return repository.retrieve(Dish, req.body.name);
}

/**
 * Update a dish by given information in request
 * @param {*} req
 */
function updateDishById(data) {
  return new Promise(function(resolve, reject) {
    console.log("id", data._id);
    Dish.update(
      { _id: data._id },
      {
        name: data.name,
        description: data.description,
        orderingPosition: data.orderingPosition,
        uom: data.uom,
        category: data.category,
        type: data.type ? data.type : 0,
        price: data.price,
        image: data.image
      },
      function(err, data) {
        //
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      }
    );
  });

  //return repository.update(dish, data._id);
}

/**
 * Retrieve all dishes.
 */
function getAll(req) {
  console.log("Dish Service -- getAll()");
  return repository.list(Dish, true);
}

function removeDish(data) {
  console.log(data);
  return new Promise(function(resolve, reject) {
    console.log("id", data._id);
    Dish.findOneAndRemove(
      { _id: data._id },
      {
        name: data.name,
        description: data.description,
        orderingPosition: data.orderingPosition,
        uom: data.uom,
        category: data.category,
        type: data.type ? data.type : 0,
        price: data.price,
        image: data.image
      },
      function(err, data) {
        //
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
}

module.exports = {
  createDish,
  findDishById,
  updateDishById,
  getAll,
  removeDish
};
