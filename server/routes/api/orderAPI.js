const express = require('express');
const router = express.Router();

const Orders = require('../../models/order.js');

router.use(express.json())

// list all orders of the user with id ......
router.get('/userorders/:userid' , async (request , responce) => {
    try{
        const userOrders = await  Orders.find().where('user').equals(request.body.userid);
        responce.status(200).json(userOrders);
    }
    catch(err){
        responce.status(500).json({Message:'There was an ERROR fetching the user orders',Error:err});
    }

})
// order with id .....
router.get('/:id' , async (request , responce) => {
    try{
        const userOrder = await  Orders.findById(responce.body.id);
        responce.status(200).json(userOrder);
    }
    catch(err){
        responce.status(500).json({Message:'There was an ERROR fetching the order',Error:err});
    }

})

router.post('/create' , async (request,responce) => {
    try{
        const userOrder = new Orders(
            {user : request.body.user,
            cart : request.body.cart,
            total : request.body.total,
        });
        await userOrder.save()
        responce.status(201).send(`new user was created: ${userOrder}`)
    } catch(err) {
        responce.status(500).json({Message: 'There was an ERROR creating the order',Error: err})
    }

})
// updating order may be appling discount 
router.put('/:id' , async (request,responce) => {
    try{
        const updated = await Orders.updateOne(
            {_id : request.params.id},
             { $set: {
                total : request.body.total}});
        await updated.save()
        responce.status(201).json(updated)
    }catch(err){
        responce.status(500).json({Message:`There was an ERROR Updating the user order`,Error:err});
    }
})

module.exports = router;