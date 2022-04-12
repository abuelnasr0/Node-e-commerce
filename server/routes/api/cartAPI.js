const express = require('express');
const router = express.Router();

const {Cart,CartItem} = require('../../models/cart.js');

router.use(express.json())

router.get('/listcarts', async (requset, responce) => {
    try{
        const carts = await Cart.find()
        responce.status(200).json(carts)
    }catch(e) {
        responce.status(500).json({ERROR : e})
    }
})

// get cart with user id 
router.get('/user/:userid' , async (request , responce) => {
    try{
        const userCart = await  Cart.findOne({user : request.body.userid},function( e, d) {
            if (e) { console.log(e)}
            else {console.log(d)}
        });
        // console.log(userCart._id)
        responce.status(200).json(userCart);
    }
    catch(err){
        responce.status(500).json({Message:'There was an ERROR fetching the data',Error:err});
    }

})

// get cart with cart id 
router.get('/:id' , async (request , responce) => {
    try{
        const userCart = await  Cart.findById(request.body.id);
        console.log(userCart)
        responce.status(200).json(userCart);
    }
    catch(err){
        responce.status(500).json({Message:'There was an ERROR fetching the data',Error:err});
    }

})

router.get('/:id/items' , async (request , responce) => {
    try{
        const userCart = await  Cart.findById(request.body.id);
        console.log(userCart.products)
        responce.status(200).json(userCart.products);
    }
    catch(err){
        responce.status(500).json({Message:'There was an ERROR fetching the data',Error:err});
    }

})

router.post('/create' , async(request,responce) => {
    try{
        const newCart = new Cart({user : request.body.user});
        await newCart.save()
        responce.status(201).send(`new user was created: ${newCart}`)
    } catch(err) {
        responce.status(500).json({Message: 'There was an ERROR creating the user',Error: err})
    }

})

// not tested yet
router.put('/add/:id' , async (request,responce) => {
    try{
        const newItem = new CartItem(
        {
            product: request.body.product,
            quantity : request.body.quantity,
            purchasePrice : request.body.price,
            totalprice : request.body.totalprice,
            status : request.body.status
        })
        console.log(newItem)
        const updated = await Cart.updateOne(
            {_id : request.params.id},
             { $set: {
                products : products.push(newItem)}}, (err,data)=>{
                    if (err) console.log(err)
                    else console.log(data)
                });
                // products : products.push(newItem)}});
        console.log(updated)
        await updated.save()
        responce.status(201).json(updated)
    }catch(err){
        responce.status(500).json({Message:`There was an ERROR Adding the item`,Error:err});
    }
})

router.delete('/:id', async (request,responce) => {
    try{
        const deleted = await Cart.deleteOne({_id : request.body.id})
        responce.status(200).json(deleted)
    }catch(e) {
        responce.status(500).json(e)
    }
})

module.exports = router;