var mongoose = require("mongoose");
var Orders = mongoose.model("Orders");
const repository = require("../../models/repository");
const DbConstant = require("../../utils/dbConstant");

function addTestOrders(req, res) {
  return new Promise(function(resolve, reject) {
    let order = new Orders(req.body);
    repository
      .create(order)
      .then(data => {
        resolve({
          data: data,
          action: DbConstant.CREATE
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

function findAllOrders(req) {
  return new Promise(function(resolve, reject) {
    Orders.find({}, function(err, order) {
      if (err) reject("There was a problem finding the order.");
      if (!order) reject("No order found.");
      resolve(order);
    });
  });
}

function deleteAllOrders(req) {
  return new Promise(function(resolve, reject) {
    Orders.remove({}, function(err, order) {
      if (err) reject("There was a Error Deleting the order.");
      if (!order) reject("Deleting failed | Empty Order.");
      resolve(order);
    });
  });
}

function deleteById(req, res) {
  return new Promise(function(resolve, reject) {
    const userId = req.params._id;
    Orders.findOneAndDelete({ _id: userId }, function(err, order) {
      if (err) reject("There was a Error Deleting the order.");
      if (!order) reject("Deleting failed | Empty Order.");
      resolve(order);
    });
  });
}

function changeStatus(req, res) {
  return new Promise(function(resolve, reject) {
    const userId = req.params._id;
    console.log("datas --- ", userId);
    Orders.update({ _id: userId }, { $set: { status: "completed" } }, function(
      err,
      order
    ) {
      if (err) reject("There was a error changing Status of the order.");
      if (!order) reject("ChangeStatus failed | No Order.");
      resolve(order);
    });
  });
}

module.exports = {
  findAllOrders,
  addTestOrders,
  deleteAllOrders,
  deleteById,
  changeStatus
};
