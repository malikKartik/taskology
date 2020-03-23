const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"List"
    },
    card:[{
        type:mongoose.Schema.Types.ObjectId,
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    boards:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
})

const list = mongoose.model('List', listSchema)

module.exports = list