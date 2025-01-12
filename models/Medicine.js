
const mongoose = require('mongoose');


const medecineShema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Dosage  : {
        type: Number,
        required: true  
    },
    Frequency : {
        type: Number,
        required: true
    },
    dateStart : {
        type: Date
    },
    dateEnd : {
        type: Date
    }
})

// Create Medecine Model
const Medecine = mongoose.model('Medecine', medecineShema);
module.exports = Medecine;