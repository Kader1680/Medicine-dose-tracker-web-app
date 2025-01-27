
const mongoose = require('mongoose');


const medecineShema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    Name: { type: String},
    Dosage  : { type: Number},
    Frequency : { type: Number},
    Start : { type: Date}, 
    Time : { type: Number}, 
    dayTaken : { type: [String] }
})

// Create Medecine Model
module.exports = mongoose.model('Medecine', medecineShema);
