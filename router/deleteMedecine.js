
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


router.delete('/:id', async (req, res)=>{
        
    try {

        const idMedecine = await Medicine.findByIdAndDelete(req.params.id)
        console.log(idMedecine)

        if (!idMedecine) {
            res.status(404).json({message: "medecine not found"})
        }
        res.status(200).json({message: "Done, Medecine has Deleted"})
        

    } catch (error) {
        res.status(500).json({message:error})
    }

})




module.exports = router;
