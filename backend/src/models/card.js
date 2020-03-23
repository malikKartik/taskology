const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dueDate:{
        type: Date
    },
    lists:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const card = mongoose.model('Card', cardSchema)

module.exports = card