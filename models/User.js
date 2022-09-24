const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    email: {
        type: String,
        required : [true, 'Please add your email'],
        unique: true,
        validate: [isEmail,'Invalid Email']
    },
    password: {
        type: String,
        required : [true, 'Please add a password'],
        unique: true,
        minLength: [6, 'Minimum password length is 6 characters']
    }
},)

userSchema.pre('save',async function (next)  {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports = mongoose.model('User',userSchema)