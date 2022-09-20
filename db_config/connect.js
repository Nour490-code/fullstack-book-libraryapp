const mongoose = require('mongoose')
const dotenv = require('dotenv')

// connecting to mongoDB
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        .then(console.log(`MongoDB is connected`))
        .catch((err) => console.log(err))
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports = {
    connectDB,
}