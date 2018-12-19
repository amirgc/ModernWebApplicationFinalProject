var mongoose = require("mongoose");

var dishSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    orderingPosition: String,
    uom: String,
    category: String,
    types: [{ name: String, sizes: [{ name: String, price: Number }] }],
    created_date: { type: Date, default: Date.now }
  },
  {
    strict: true
  }
);

module.exports = mongoose.model("Dishes", dishSchema);
