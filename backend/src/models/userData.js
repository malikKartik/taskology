const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    year:[{
        year:{
            type:String
        },
        number:{
            type:Number,
            default:0
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const userData = mongoose.model('userData', userDataSchema)

module.exports = userData