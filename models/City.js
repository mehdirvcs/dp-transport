const mongoose =  require('mongoose')

const CitySchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    state: {
        type:String,
    },
    pincode: {
        type:String,
    },
    RateFactor: {
        type: Map,
        of: Number
    }
}) 

module.exports = mongoose.model('City', CitySchema)