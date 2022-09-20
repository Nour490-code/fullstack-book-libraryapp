const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    author: {
        type: String,
        required : [true, 'Please add an author']
    },
    callNumber: {
        type: String,
        required : [true, "Please add yhe book's call number"],
        unique: true
    },
    availability:{
        type: Boolean
    }
},
{
    timestamps: true
})

module.exports = {
    bookSchema,
}