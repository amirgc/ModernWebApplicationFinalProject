var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  totalAmount: Number,
  user: {
    name: String,
    email: String,
    address: String,
    phone: String,
    role: String,
    created_at: { type: Date, default: Date.now }
  },
  discount: String,
  status: String,
  orderline: [
    {
      amount: Number,
      dish: String,
      qty: Number,
      rate: Number,
      size: String,
      Type: String,
      uom: String
    }
  ]
});

module.exports = mongoose.model("Orders", orderSchema);
