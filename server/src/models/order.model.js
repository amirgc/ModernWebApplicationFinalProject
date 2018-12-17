var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    totalAmount: Number,
    userid: String,
    discount: String,
    status : String,
    orderline: [
        {
            Orderlineid: Number,
            Amount: Number,
            Dish: String,
            qty: Number,
            Rate: Number,
            Size: String,
            Type: String,
            UoM: String
        }]
});

module.exports = mongoose.model("Orders", orderSchema);



