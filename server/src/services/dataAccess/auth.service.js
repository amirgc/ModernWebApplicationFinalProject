var mongoose = require("mongoose");
var User = mongoose.model("User");
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
      password: hashedPassword
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

    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
      function(err, user) {
        // if (err)
        //   return res
        //     .status(500)
        //     .send("There was a problem registering the user.");
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        resolve({ auth: true, token: token });
      }
    );
  });
}

module.exports = { createUser };
