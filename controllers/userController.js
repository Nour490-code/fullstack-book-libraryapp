const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/User');
const {handleErrs} = require('../middleware/handleErrs')



//Sign up functionality
const registerUser = asyncHandler(async (req,res) =>{

    // Getting all fields
    const {name,email,password} =  req.body
    
    // pushing data of the new user to mongoDB
    try{
        const user = await User.create({
            name,
            email,
            password
        })
        
        //Generating a token from genToken function
        if(user){
            const token = genToken(user._id)
            res.cookie('jwt',token,{httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000})
            res.status(201).json({user: user._id})
        }
    }
    catch(err){
        const errors = handleErrs(err);
        res.status(400).json({errors})
    }
})


//  Login functionality
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body

    try{

        //Finding the user
        const user = await User.findOne({email})

        // Decoding the password to compare it with the entred password
        if( user && (await bcrypt.compare(password,user.password))){
            
            const token = genToken(user.id)

            res.cookie('jwt',token,{httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000})
            res.status(201).json({user: user._id})
        }
        else{
            throw new Error('incorrect email or password')
        }
    }
    catch(err){
        const errors  = handleErrs(err);
        res.status(400).json({errors})
    }
})

const logOut = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/login');
})


// genetrating a token
const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '2d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    logOut,
}