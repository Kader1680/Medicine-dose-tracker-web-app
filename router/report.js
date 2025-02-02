const express = require("express")
const app = express()
const router = express.Router()
const medecineController = require("../controller/medecineContr")
const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
 
const Medecine = require("../models/Medicine")

app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

router.get('/report', async (req, res)=>{
        
        try {
            const allMedecines = await Medecine.countDocuments()
            const medecineMissed = await Medecine.find({})
            res.render('report', { 
                medecines : allMedecines,
                medecineMissed : medecineMissed
             });
        } catch (error) {
            res.status(500).json({message:error})
        }

        
    res.render("medecines")
})





module.exports = router