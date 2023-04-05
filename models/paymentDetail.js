const mongoose = require('mongoose')
const user = require('./userModel')

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true,
    },
    token:{},    
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment