
const express = require('express');
const app = express()
const router = express.Router();

const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");
const Medicine = require('../models/Medicine');


app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

router.post('/add', async (req, res)=>{
    
    try {
        const { Name, Dosage, Frequency } = req.body     
        const allMedecines = await Medicine.create({ Name, Dosage, Frequency })
        res.send(allMedecines)
        
         
     
    } catch (error) {
        res.send(error)
        
    }
})

router.get('/add', (req, res)=>{
    res.render('addMedecine')
})

module.exports = router;
