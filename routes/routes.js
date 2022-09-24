const express= require('express')
const {registerUser, loginUser} = require('../controllers/userController')

const router = express.Router()

router.post('/signup',registerUser)
router.get('/signup', (req,res) => res.render('signup'))

 
router.get('/login',(req,res) => {
    loginUser(req,res);
    res.render('login')
})

router.get('/',(req,res) => res.send('dashboard'))

module.exports = router
