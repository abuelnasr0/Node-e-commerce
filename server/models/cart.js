const mongoose = require('mongoose');
// const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema
const CartItem = require('./cartItem')
const CartSchema = new Schema(
    {
        products: [CartItem.schema],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);
const Cart = mongoose.model('Cart',CartSchema)
module.exports = {Cart, CartItem};