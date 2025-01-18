const express = require('express');
const app = express()
const router = express.Router();

const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");
const Medicine = require('../models/Medicine');

router.get('/', async (req, res)=>{
        
        try {
            const allMedecines = await Medicine.find({})
            // res.status(200).json(allMedecines)
            res.render('medecines', { medicines: allMedecines });
        } catch (error) {
            res.status(500).json({message:error})
        }

        
    res.render("medecines")
})



module.exports = router;