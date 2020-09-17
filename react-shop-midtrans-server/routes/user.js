const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const midtransClient = require('midtrans-client');

// database 
const mongoose = require('mongoose');
const check = require('../middleware/checkToken');
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const Payment = mongoose.model("Payment");
///////////////////////////////////////////////////////////////////////


router.get('/simple_checkout/:price', (req, res) => {
    
    // initialize snap client object
    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'SB-Mid-server-L3nvLRCOJrujV_fA_fCjngzt',
        clientKey : 'SB-Mid-client-skAFA8h6Foiyuc1r'
    });
    
    let rand_order_id = uuidv4()
    
    let parameter = {
        "transaction_details": {
            "order_id": `movie-store-${rand_order_id}`,
            "gross_amount": parseInt(req.params.price)
        }, "credit_card":{
            "secure" : true
        }
    };
    
    
    snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            let transactionToken = transaction.token;
            console.log('transactionToken:',transactionToken);
            res.json({token:transactionToken})
        })
})

router.post('/buyproduct', check, (req, res) => {

    const { snaps, items } = req.body
    
    if( !snaps || !items){
        return res.status(422).json({error: "please add all the required fields"})
    }
    req.user.password = undefined
    snaps.status_code = snaps.status_code.toString()

    const payment = new Payment({
        user:req.user,
        data:snaps,
        product:items
    })

    payment.save().then(result => {
        const histo = {
            info: req.user.role.toString(),
            paymentId: result 
        }
        User.findByIdAndUpdate(req.user._id, {
            $push:{history: histo}
        },{
            new: true
        })
        .populate("history.paymentId", "data product")
        .exec((err,userresult) => {
            if(err){
                return res.status(422).json({error: err})
            }else{
                    for(let i=0; i<items.length; i++){
                        Product.findById(items[i].ids)
                            .then(resProd=>{
                                Product.findByIdAndUpdate(items[i].ids,{
                                    $set:{
                                        stock: resProd.stock - items[i].unit
                                    }
                                },{
                                    new:true
                                },(err,resProdFinal)=>{
                                    if(err){
                                        return res.status(422).json({error:"failed updated"})
                                    }
                                })
                            })
                    }   

                res.json({userresult})
            }
        })
        // result.populate('user', '_id name').execPopulate()
    })
    .catch(err => {
        console.log(err)
    })
})





module.exports = router