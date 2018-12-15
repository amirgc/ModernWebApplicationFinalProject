var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String, //hash created from password
    address: String,
    phone: String,
    role: String,
    created_at: { type: Date, default: Date.now }
  },
  {
    strict: true
  }
);

module.exports = mongoose.model("Users", userSchema);
