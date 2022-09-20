const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/User');

//Sign up functionality
const registerUser = asyncHandler(async (req,res) =>{

    //rendering the sign up page
    // res.render('signup')
    
    // checking if all fields are added
    const {name,email,password} = req.body
    if (!name || !email || !password){
        res.status(400)
        throw new Error ('please add all field')
    }

    //checking if user already exists
    const userExists = await User.findOne({email})
    console.log(userExists)
    
    if(userExists){
        res.status(400)
        throw new Error ('User already exists')
    }

    //hashing the user's password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

    // pushing data of the new user to mongoDB
    const user = await User.create({
        name,
        email,
        password: hashedPass
    })


    if(user){
        // res.status(201).json({
        //     _id:user.id,
        //     name: user.name,
        //     email: user.email,
        //     token: genToken(user._id)
        // })
        res.redirect('/dashboard')
    }else{
        res.status(400)
        throw new Error ('invalid')
    }
})


// login functionality
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body

    //finding the user
    const user = await User.findOne({email})

    // decoding the password to compare it with the entred password
    if( user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('invalid')
    }
})


// genetrating a token
const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '2d',
    })
}

module.exports = {
    registerUser,
    loginUser
}