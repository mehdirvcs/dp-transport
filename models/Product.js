const mongoose =  require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    hsncode: {
        type: String
    },
    price: {
        type: Number
    }
}) 

module.exports = mongoose.model('Product', ProductSchema)