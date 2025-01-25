
const mongoose = require('mongoose');


const medecineShema = new mongoose.Schema({
    _id: {
        type: String, // Change to String if strings are valid IDs for your use case
    },
    Name: { type: String},
    Dosage  : { type: Number},
    Frequency : { type: Number},
    Start : { type: Date}, 
    Time : { type: Number}, 
    dayTaken : { type: [String] }
})

// Create Medecine Model
module.exports = mongoose.model('Medecine', medecineShema);
