const mongoose =  require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    pickup_city: {
        type:mongoose.Types.ObjectId,
        ref:'City',
        required:[true, 'Please provide pickup city']
    },
    drop_city: {
        type:mongoose.Types.ObjectId,
        ref:'City',
        required:[true, 'Please provide drop city']
    },
    mode: {
        type: String,
        enum: ['Pickup', 'Delivery'],
        default: 'Delivery'
    },
    hsncode: { 
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:[true, 'Please provide product']
    },
    pickup_date: {
        type: Date,
        default: Date.now
    },
    wieght: {
        type: Number
    },
    weight_type: {
        type: String,
        enum: ['kg', 'ton']
    },
    status: {
        type: String,
        enum: ['Initiated', 'Assigned', 'In_progress', 'Booked', 'Rejected']
    }
},  {timestamps: true}
) 

module.exports = mongoose.model('Enquiry', EnquirySchema)