
const mongoose = require('mongoose');


const trackerShema = new mongoose.Schema({
    _id: {
        type: String,
      },
    status: { type: [String]},
    
  //   medicine: { 
  //   type: mongoose.Schema.Types.ObjectId, // Reference to Medicine
  //   ref: 'Medicine', // Model name to reference
  //   required: true, // Ensure a related Medicine is specified
  // },
})

// Create Medecine Model
module.exports = mongoose.model('Tracker', trackerShema);
