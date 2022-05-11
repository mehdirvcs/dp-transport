const mongoose =  require('mongoose')

const BranchSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    city: {
        type:mongoose.Types.ObjectId,
        ref:'City',
        required:[true, 'Please provide city']
    },
    manager: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    },
    active: {
        type: Boolean
    }
}) 

module.exports = mongoose.model('Branch', BranchSchema)