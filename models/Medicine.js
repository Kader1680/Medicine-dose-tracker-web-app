
const mongoose = require('mongoose');


const medecineShema = new mongoose.Schema({
    Name: { type: String},
    Dosage  : { type: Number},
    Frequency : { type: Number},
    Start : { type: Date},
    End : { type: Date},
})

// Create Medecine Model
module.exports = mongoose.model('Medecine', medecineShema);
