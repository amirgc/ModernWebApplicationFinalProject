"use strict";

const OrderService = require("../../services/dataAccess/order.service");
const DbConstant = require("../../utils/dbConstant").kind;
var mongoose = require("mongoose");
var Orders = mongoose.model("Orders");


function FindAllOrders(req, res) {
  console.log("Find Orders");
  OrderService.findAllOrders(req)
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => res.status(500).send("fail"));
}

function AddTestOrders(res){
    console.log("Add Orders");
    OrderService.addTestOrders()
      .then(orders => {
        let data = new Orders(orders);
        data.save();
      })
      .catch(err => res.status(500).send("fail"));
  }


module.exports = {
  FindAllOrders, AddTestOrders
};
