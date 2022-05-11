const mongoose =  require('mongoose')

const QuotationSchema = new mongoose.Schema({
    Enquiry_id: {
        type:mongoose.Types.ObjectId,
        ref:'Enquiry',
        required:[true, 'Please provide Enquiry Id']
    },
    rateByDate: {
        type: Map,
        of: Number
    },
    pickup_charges: {
        type: Number
    },
    deliverycharges: {
        type: Number
    },
    handling_charges: {
        type: Number
    },
    transport_cost: {
        type: Number
    },
    active: {
        type: Boolean
    },
},  {timestamps: true}
) 

module.exports = mongoose.model('Quotation', QuotationSchema)