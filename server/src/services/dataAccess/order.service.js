var mongoose = require("mongoose");
var Orders = mongoose.model("Orders");

function addTestOrders(req) {
    return new Promise(function (resolve, reject) {

        let order = new Orders({
            totalAmount: 700,
            userid: 'Ranjan',
            discount: '0%',
            status: "pending",
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
        if (!order) reject("No/Empty Order")
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
    })
}

function deleteAllOrders(req) {
    return new Promise(function (resolve, reject) {
        Orders.remove({}, function (err, order) {
            if (err) reject("There was a Error Deleting the order.");
            if (!order) reject("Deleting failed | Empty Order.");
            resolve(order);
        });
    })
}

function deleteById(req, res) {
    return new Promise(function (resolve, reject) {
        const userId = req.params._id;
        Orders.findOneAndDelete({ _id: userId }, function (err, order) {
            if (err) reject("There was a Error Deleting the order.");
            if (!order) reject("Deleting failed | Empty Order.");
            resolve(order);
        });
    })
}

function changeStatus(req, res) {
    return new Promise(function (resolve, reject) {
        const userId = req.params._id;
        console.log("datas --- ", userId);
        Orders.update({ _id: userId }, { $set: { status: "completed" } }, function (err, order) {
            if (err) reject("There was a error changing Status of the order.");
            if (!order) reject("ChangeStatus failed | No Order.");
            resolve(order);
        });
    })
}


module.exports = { findAllOrders, addTestOrders, deleteAllOrders, deleteById, changeStatus };
