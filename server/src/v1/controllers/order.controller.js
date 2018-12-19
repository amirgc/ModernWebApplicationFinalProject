"use strict";
const OrderService = require("../../services/dataAccess/order.service");

function FindAllOrders(req, res) {
  console.log("Find Orders");
  OrderService.findAllOrders(req)
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err
      });
    });
}

function FindOrdersById(req, res) {
  console.log("Find Orders", req.params.id);

  OrderService.findOrdersById(req.params.id)
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err
      });
    });
}

function AddTestOrders(req, res) {
  console.log(req.body);
  OrderService.addTestOrders(req, res)
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err
      });
    });
}

function DeleteAllOrders(req, res) {
  console.log("Delete Orders");
  OrderService.deleteAllOrders()
    .then(orders => {
      res.status(200).send({
        status: "sucess",
        data: []
      });
    })
    .catch(err =>
      res.status(500).send({
        status: "error",
        message: err
      })
    );
}

function DeleteOrder(req, res) {
  OrderService.deleteById(req, res)
    .then(orders => {
      res.status(200).send({
        status: "sucess",
        data: orders
      });
    })
    .catch(err => {
      console.log("Failed This Orders");
      res.status(500).send({
        status: "error",
        message: err
      });
      console.log("fail");
    });
}

function ChangeOrderStatus(req, res) {
  OrderService.changeStatus(req, res)
    .then(orders => {
      res.status(200).send({
        status: "sucess",
        message: "order status => completed"
      });
    })
    .catch(err => {
      console.log("Failed This Orders");
      res.status(500).send({
        status: "error",
        message: err
      });
      console.log("fail");
    });
}

module.exports = {
  FindAllOrders,
  AddTestOrders,
  DeleteAllOrders,
  DeleteOrder,
  ChangeOrderStatus,
  FindOrdersById
};
