const Medecine = require("../models/Medicine")
const bodyParser = require('body-parser');
const { connectDB, closeDB } = require('../config/db'); // Import the connection methods
exports.addMedicine = async (req, res) => {
    const { Name, Dosage, Frequency} = req.body;
    
    try {
    const db = await connectDB(); // Get the MongoDB database connection
    const collection = db.collection('medicines'); // Access the collection
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

  process.on('SIGINT', async () => {
    await closeDB(); // Close MongoDB connection
    console.log('Application terminated. MongoDB connection closed.');
    process.exit(0);
  });