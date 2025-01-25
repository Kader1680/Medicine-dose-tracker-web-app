
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
const Tracker = require('../models/Tracker');

// Middleware to parse URL-encoded data
 
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

router.post('/medecine', async (req, res)=>{

    
    
    try {
            
        const { isTacken, id_medecine } = req.body   
        // res.send( { isTacken, id_medecine })
 
        const newTracker = await Tracker.create({ 
        _id: new mongoose.Types.ObjectId(), 
        isTacken : isTacken, 
        medicine : id_medecine          
        })
        await newTracker.save()

        
        res.redirect("/medecines")
          

    } catch (error) {
        console.log(error)
    }
})


module.exports = router