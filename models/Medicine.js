
const mongoose = require('mongoose');


const medecineShema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    Name: { type: String},
    Dosage  : { type: Number},
    Frequency : { type: Number},
    Time : { type: Date}, 
    dayTaken : { type: [String] }
})

// Create Medecine Model
module.exports = mongoose.model('Medecine', medecineShema);
