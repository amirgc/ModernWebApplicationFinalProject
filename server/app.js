var createError = require("http-errors");
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var express = require("express");
var path = require("path");
process.env.PWD = process.env.PWD || path.resolve(__dirname);
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

var logger = require("morgan");
const envConfig = require(`${process.env.PWD}/config/env/envConf`);

//initialize mongoose schemas
require("./src/models/initialize-model");
var mongoose = require("mongoose"); //add for Mongo support
var cors = require("cors");
mongoose.connect(
  "mongodb+srv://supadmin:blast6365@cluster0-brkqj.mongodb.net/foodOrderingDb_Dev?retryWrites=true"
);
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const port = process.env.PORT || envConfig.get("PORT");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}))

// Include all routes
require(`./helpers/routes`).route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Api is running at port ${port}`);
});

module.exports = app;
