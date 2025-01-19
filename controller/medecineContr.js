const Medecine = require("../models/Medicine")
const bodyParser = require('body-parser');
const { connectDB, closeDB } = require('../config/db'); // Import the connection methods

exports.addMedicine = async (req, res) => {
    const { Name, Dosage, Frequency} = req.body;
    
    try {
    
      const newMedicine = await Medecine.create({
        Name,
        Dosage,
        Frequency
      });
      res.status(201).json({ success: true, data: newMedicine });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  
