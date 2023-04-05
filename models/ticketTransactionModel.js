const mongoose = require('mongoose')
const ticket = require('./ticketModel')
const user = require('./userModel')
const ticketTransactionSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ticket,
        required: true,
    },
    firstName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    lastName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        require:  [true, 'Please your email'],
        unique: true,
        lowercase: true,
        trim:true
    },
    fee:{
        type: Number,
    },
    status: {
        type: String,
        enum: ['successful', 'pending', 'failed'],
        default: 'pending',
    },
    numberOfPurchase:{
        type: Number,
    },
    amount:{
        type: Number,
    },
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

const TicketTransaction = mongoose.model('TicketTransaction', ticketTransactionSchema)
module.exports = TicketTransaction