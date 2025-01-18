
const mongoose = require('mongoose');


const medecineShema = new mongoose.Schema({
    Name: { type: String},
    Dosage  : { type: Number},
    Frequency : { type: Number},
})

// Create Medecine Model
module.exports = mongoose.model('Medecine', medecineShema);
