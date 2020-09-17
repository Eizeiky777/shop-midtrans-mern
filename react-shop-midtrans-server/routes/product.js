const express = require('express');
const router = express.Router();

// database 
const mongoose = require('mongoose');
const check = require('../middleware/checkToken');
const Product = mongoose.model("Product");
///////////////////////////////////////////////////////////////////////

// CRUD section
router.get('/allproduct', (req, res) => {
    Product.find()
        .sort("-createdAt")
        .then(result => {
            res.json({result})
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createproduct', (req, res) => {
    const { title, description, price, pic, stock } = req.body
    
    if(!title || !description || !price || !pic || !stock){
        return res.status(422).json({error: "please add all the required fields"})
    }

    const product = new Product({
        title,
        description,
        price,
        pic,
        stock,
    })
    product.save().then(result => {
        res.json({result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/updateproduct', (req, res) => {
    
    Product.findByIdAndUpdate(req.body.productId,
        {$set:{
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            pic:req.body.pic,
            stock:req.body.stock,
        }},
        {new: true},
        (err, result) => {
            if(err){
                return res.status(422).json({error:"failed updated"})
            }
            res.json(result)
        }
    )
})

router.delete('/deleteproduct/:productId', (req, res) => {
    Product.findOne({_id:req.params.productId})
    .exec((err, product) => {
        if(err || !product){
            return res.status(422).json({error: err})
        }
            product.remove()
            .then(result => {
                res.json({message: "successfully deleted", result:result })
            })
            .catch(err=>{
                console.log(err)
            })
    })
})
// end

// CRUD modified section 



module.exports = router;