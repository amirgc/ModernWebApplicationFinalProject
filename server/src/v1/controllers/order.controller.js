"use strict";

const OrderService = require("../../services/dataAccess/order.service");
const DbConstant = require("../../utils/dbConstant").kind;
var mongoose = require("mongoose");
var Orders = mongoose.model("Orders");


function FindAllOrders(req, res) {
    console.log("Find Orders");
    OrderService.findAllOrders(req)
        .then(orders => {
            res.status(200).send({
                'status': 'sucess',
                'data': orders
            }
            );
        })
        .catch(err => res.status(500).send({
            'status': 'error',
            'message': err
        }));
}

function AddTestOrders(req, res) {
    console.log("Add Orders");
    console.log("yyy -",req.body);
    OrderService.addTestOrders(req,res)
        .then(
            orders => {
                // console.log(orders);
                let data = new Orders(orders);
                data.save();
                res.status(200).send({
                    'status': 'sucess',
                    'data': data
                });
            })
        .catch(err => res.status(500).send({
            'status': 'error',
            'message': err
        }));
}

function DeleteAllOrders(req, res) {
    console.log("Delete Orders");
    OrderService.deleteAllOrders()
        .then(
            orders => {
                res.status(200).send({
                    'status': 'sucess',
                    'data': []
                });

            })
        .catch(err => res.status(500).send({
            'status': 'error',
            'message': err
        }));
}

function DeleteOrder(req, res) {
    OrderService.deleteById(req, res)
        .then(
            orders => {
                res.status(200).send({
                    'status': 'sucess',
                    'data': orders
                });
            })
        .catch(err => {
            console.log("Failed This Orders");
            res.status(500).send({
                'status': 'error',
                'message': err
            })
            console.log("fail")

        });
}

function ChangeOrderStatus(req, res) {
    OrderService.changeStatus(req, res)
        .then(
            orders => {
                res.status(200).send({
                    'status': 'sucess',
                    'message': "order status => completed"
                });
            })
        .catch(err => {
            console.log("Failed This Orders");
            res.status(500).send({
                'status': 'error',
                'message': err
            })
            console.log("fail")

        });
}

module.exports = {
    FindAllOrders, AddTestOrders, DeleteAllOrders, DeleteOrder, ChangeOrderStatus
};
