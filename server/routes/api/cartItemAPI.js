const express = require('express');
const router = express.Router();

const CartItems = require('../../models/cartitem.js');

router.use(express.json())


module.exports = router