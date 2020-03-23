const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"Board"
    },
    list:[{
        type:mongoose.Schema.Types.ObjectId,
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const board = mongoose.model('Board', boardSchema)

module.exports = board