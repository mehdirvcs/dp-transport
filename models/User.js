const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 50
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email'
        ],
        unique: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Consigner'],
        default: 'Consigner'
    },
    address_1: {
        type:String,
    },
    address_2: {
        type:String,
    },
    city: {
        type:mongoose.Types.ObjectId,
        ref:'City',
        required:[true, 'Please provide city']
    },
    gst: {
        type: Number
    },
    active: {
        type: Boolean
    },
    is_deleted: {
        type: Boolean
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6,
    },  
},  {timestamps:true})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
})
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    isMatch = await bcrypt.compare(candidatePassword, this.password)
    console.log(isMatch)
    
    return isMatch
}


module.exports = mongoose.model('User', UserSchema)
