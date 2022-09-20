const express= require('express')
const {registerUser, loginUser} = require('../controllers/userController')

const router = express.Router()

//signup
router.post('/',registerUser)
//router.get('/', (req,res) => res.render('signup'))

 
router.get('/login',loginUser)

router.get('/dashboard',(req,res) => res.send('dashboard'))

module.exports = router
