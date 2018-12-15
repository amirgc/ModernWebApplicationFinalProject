var mongoose = require("mongoose");
var User = mongoose.model("Users");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../../config/config");

function createUser(req) {
  return new Promise(function(resolve, reject) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("auth service createUser");
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role
    });

    // repository.create(user).then(function(err, user) {
    //   console.log(user);
    //   if (err) {
    //     reject("There was a problem registering the user.");
    //   }
    //   // create a token
    //   let token = jwt.sign({ id: user._id }, config.secret, {
    //     expiresIn: 86400 // expires in 24 hours
    //   });
    //   resolve(token);
    // });
    //.catch(err => reject(err));

    User.create(user, function(err, user) {
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      resolve({ auth: true, token: token });
    });
  });
}
function login(req) {
  console.log("req", req.body);
  return new Promise(function(resolve, reject) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        reject(err);
      }
      if (!user) {
        reject("No user found.");
      }

      // check if the password is valid
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) resolve({ auth: false, token: null });

      // if user is found and password is valid
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      // return the information including token as JSON
      resolve({ auth: true, token: token });
    });
  });
}

function findUserById(req) {
  return new Promise(function(resolve, reject) {
    User.findById(req.userId, { password: 0 }, function(err, user) {
      if (err) reject("There was a problem finding the user.");
      if (!user) reject("No user found.");
      resolve(user);
    });
  });
}

module.exports = { createUser, login, findUserById };
