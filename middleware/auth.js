const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User');


const protectRoutes = asyncHandler(async (req,res,next) => {
   const token = req.cookies.jwt;

   if(token){

    jwt.verify(token,process.env.JWT_SECRET, (err,decoded) => {
        if(err){
            console.log(err.message)
        }else{
            console.log(decoded)
            next()  
        }
    })

   }else{
    res.redirect('/login')
   }
})



const checkUser = asyncHandler( (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){

        jwt.verify(token,process.env.JWT_SECRET, async (err,decoded) => {
            if(err){
                res.locals.user = null
                console.log(err)
                next()
            }else{
                let user =  await User.findById(decoded.id)
                res.locals.user = user;
                next()  
            }
        })
    
       }else{
         res.locals.user = null
         next()
       }
})

module.exports = {
    protectRoutes,
    checkUser,
}