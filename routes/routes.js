const express= require('express')
const {registerUser, loginUser} = require('../controllers/userController')
const {protectRoutes, checkUser} = require('../middleware/auth');
const {logOut} = require('../controllers/userController')

const router = express.Router()

//Checking of user to get his data in every route
router.get('*',checkUser)

router.post('/signup',registerUser)
router.get('/signup', (req,res) => res.render('signup'))

 
router.post('/login',loginUser)
router.get('/login', (req,res) => res.render('login'))

router.get('/logout',logOut)

router.get('/',protectRoutes,(req,res) => res.render('dashboard'))



module.exports = router
