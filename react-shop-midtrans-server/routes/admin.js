const express = require('express');
const router = express.Router();

const check = require('../middleware/checkToken');
const mongoose = require('mongoose');
const Payment = mongoose.model("Payment");

router.get('/alltransactions/:month', check, (req,res) => {
    var start = parseInt(req.query.pageNo) ? parseInt(req.query.pageNo) - 1 : 0
    var end = parseInt(req.query.size) ? parseInt(req.query.size) : 10

    // if(pageNo < 0 || pageNo === 0) {
    //     response = {"error" : true,"message" : "invalid page number, should start with 1"};
    //     return res.json(response)
    // }

    const month = req.params.month !== "undefined" ? req.params.month : "01"
    const month_end = req.params.month !== "undefined" ? req.params.month : "12"
    
    if(req.user.role === 1){
        Payment.collection.countDocuments()
            .then(size=>{
                Payment.find({createdAt: {$gte: `2020-${month}-01T00:00:00`, $lte:`2020-${month_end}-31T00:00:00`}})
                .sort("-createdAt")
                .skip(start)
                .limit(end)
                .populate("user", "name email")
                .then(result => {
                    res.json({result,size})
                })
                .catch(err => {
                    return res.json({result: "Network offline "})
                })
            })
        
    }else{
        return res.status(401).json({error: "UNAUTHORIZED :) "})
    }

})


module.exports = router;