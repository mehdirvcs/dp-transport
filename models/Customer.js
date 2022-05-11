const mongoose =  require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    mobile: {
        type:String,
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
    is_deleted: {
        type: Boolean
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
},  {timestamps:true}
) 

module.exports = mongoose.model('Customer', CustomerSchema)