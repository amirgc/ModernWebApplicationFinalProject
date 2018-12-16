var mongoose = require("mongoose");
var Orders = mongoose.model("Orders");

function addTestOrders(req) {
    return new Promise(function (resolve, reject) {
        let order = new User({
            totalAmount: 500,
            userid: 'jhonson',
            discount: '0%',
            orderline: [
                {
                    Orderlineid: 1,
                    Amount: 500,
                    Dish: 'Test Dish',
                    qty: 1,
                    Rate: 500,
                    Size: 'test size',
                    Type: 'test type',
                    UoM: 'test UoM'
                }]
        });
        if (!order) reject("empty order.");
        resolve(order);
    });
}

function findAllOrders(req) {
    return new Promise(function (resolve, reject) {
        Orders.find({}, function (err, order) {
            if (err) reject("There was a problem finding the order.");
            if (!order) reject("No order found.");
            resolve(order);
        });
    })}

    module.exports = { findAllOrders, addTestOrders};
