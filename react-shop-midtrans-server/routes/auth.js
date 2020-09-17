const express = require('express');
const router = express.Router();

//database 
const mongoose = require('mongoose');
const User = mongoose.model("User");

// encrypting - tokening - redeeming
const check = require('../middleware/checkToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

router.get('/usercheck', (req, res)=>{
    // check user firstly before inputting new user
    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error: "hello guest , login to acces more feature :)"})
    } 
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: "you must be logged in"})
        }
        const { _id } = payload
        User.findById(_id).then(userData => {
            const { _id,name,email,role,cart,history,pic } = userData
            res.json({ user:{_id, name, email, role, cart, history, pic} })
        })
    })
})

router.post('/signup', (req, res)=>{
    const { name, email, password } = req.body
    if(!email || !password || !name){
        return res.status(422).json({error: "please fill all the fields"})
    }
    
    // check user firstly before inputting new user
    User.findOne({email: email})
        .then((savedUser) => {
            if(savedUser){
                return res.status(422).json({error: "user already taken btw : )"})
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password:hashedPassword,
                        name
                    })
                    
                    user.save()
                        .then(user => {
                            res.json({message: "saved successfully"})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        return res.status(422).json({error: "please provide email or password"})
    }
    User.findOne({email:email})
        .then(savedUser => {
            if(!savedUser){
                return res.status(422).json({error: "invalide email or password"})
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if(doMatch){
                        
                        const token = jwt.sign({ _id: savedUser._id}, JWT_SECRET)
                        const { _id,name,email,role,cart,history,pic } = savedUser
                        res.json({ token, user:{_id, name, email, role, cart, history, pic} })
                    }else{
                        return res.status(422).json({error: "invalid email or password"})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router