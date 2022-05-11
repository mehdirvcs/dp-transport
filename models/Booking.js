const mongoose =  require('mongoose')

const BookingSchema = new mongoose.Schema({
    enquiry_id: {
        type:mongoose.Types.ObjectId,
        ref:'Enquiry',
        required:[true, 'Please provide Enquiry Id']
    },
    quotation_id: {
        type:mongoose.Types.ObjectId,
        ref:'Quotation',
        required:[true, 'Please provide Quotation Id']
    },
    additional_charge: {
        type: Number
    },
    payment_status: {
        type: String,
        enum: ['In Progress', 'Failed', 'Pending']
    },
    payment_type: {
        type: String
    },
    consignee: {
        type:Map,
        of: String,
        required:[true, 'Please provide Enquiry Id']
    },
    consignor: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide Enquiry Id']
    },
    booking_status: {
        type: String,
        enum: ['Raised', 'In Progress', 'Dispute', 'Confirmed', 'Delivered', 'Closed'],
        default: 'Raised'
    },
    transaction_number: {
        type: String
    },
    paid_ammount: {
        type: Number
    }
},  {timestamps: true}
) 

module.exports = mongoose.model('Booking', BookingSchema)