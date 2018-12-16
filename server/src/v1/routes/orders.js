

var express = require('express');
var router = express.Router();
const OrderController = require("../controllers/order.controller");

router.get('/orders', OrderController.FindAllOrders);
router.post('/orders', OrderController.AddTestOrders);
router.delete('/orders', OrderController.DeleteAllOrders);
router.delete('/orders/:_id', OrderController.DeleteOrder);


module.exports = router;
