const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    lastName: {
        type: String,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    businessName: {
        type: String,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    country: {
        type: String,
        enum: ['nigeria', 'ghana'],
        trim:true
    },
    email: {
        type: String,
        require:  [true, 'Please your email'],
        unique: true,
        lowercase: true,
        // validate:[validator.isEmail, 'Please provide a valid email'] ,
        trim:true
    },
    password:{
        type: String,
        require: [true, ' please provide a password'],
        minlength: 8,
        select: false
    },    
    accountType: {
        type: String,
        enum: ['individual', 'organsation'],
        trim:true,
        require: [true, 'Please select an acoount type']

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

userSchema.pre('save', async function(next){
    // only run this function if password was modified
    if(!this.isModified('password'))
    return next()

    // Hash the password with cost of 12
this.password = await bcrypt.hash(this.password, 12)
//  Delete thepassword confirm 
this.passwordConfirm = undefined;
next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User