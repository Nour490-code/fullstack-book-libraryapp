const express = require("express")
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const {connectDB} = require('./db_config/connect')
const cookieParser = require('cookie-parser')

//connecting to mongoDB
connectDB();

const app = express()

//Express middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static('public'))

// setting the frontend view engine
app.set('view engine','ejs')

//adding the routes
app.use(require('./routes/routes'));





app.listen(port, () => console.log(`Listening on port ${port}`))
