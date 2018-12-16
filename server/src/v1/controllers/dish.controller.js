"use strict";

const DishService = require("../../services/dataAccess/dish.service");
const DbConstant = require("../../utils/dbConstant").kind;

function CreateDish(req, res) {
  console.log("auth createDish");
  DishService.createDish(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => res.status(500).send(err));
}

function FindDishById(req, res) {
  console.log("auth FindDishById");
  DishService.findDishById(req)
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
