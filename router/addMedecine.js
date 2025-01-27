
const express = require('express');
const app = express()
const router = express.Router();

const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");
const Medicine = require('../models/Medicine');

const bodyParser = require('body-parser');

// Middleware to parse URL-encoded data
 
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

router.post('/add', async (req, res)=>{

    
    
    try {
            
        const {  Name, Dosage, Frequency, Start, dayTaken, Time } = req.body   
       
        const hours = Time.split(':')[0]

        console.log(hours)

        const currentTime = new Date().getHours();

        // const distance = currentTime - hours;

        

        console.log({  Name, Dosage, Frequency, Start, dayTaken, Time  })
        
        const createMedecine = await Medicine.create({ 
            
            _id: new mongoose.Types.ObjectId(), 

            Name, Dosage, Frequency, Start, dayTaken, Time : hours  })
        
        await createMedecine.save();

        
        res.redirect("/medecines")
          

    } catch (error) {
        console.log(error)
    }
})

router.get('/add', (req, res)=>{
    res.render('addMedecine')
})

module.exports = router;


