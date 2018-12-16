

var express = require('express');
var router = express.Router();
const OrderController = require("../controllers/order.controller");

router.get('/orders', OrderController.FindAllOrders);
router.get('/addOrders', OrderController.AddTestOrders);

module.exports = router;
