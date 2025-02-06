const express = require('express');
const app = express()
const router = express.Router();

const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");
const Medicine = require('../models/Medicine');
const Tracker = require('../models/Tracker');
const { console } = require('inspector');


app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

router.get('/medecines', async (req, res)=>{
        
    

        try {
            const allMedecines = await Medicine.find({});
            const allTrackers = await Tracker.find({});

          
            const Dates = await  Medicine.find({}, "Time -_id");

            const newHours = [];

            // Iterate over allHours and calculate the distance
            Dates.forEach((el) => {
                if (el) {  
                    const now = new Date();  
                    const timeDate = new Date(el.Time);  
                    const distance = timeDate - now ; // Difference in milliseconds
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    newHours.push(hours);
                } else {
                    newHours.push(null); 
                }
            });
            

            

            const newStatus  = await Tracker.create({

                status : 6
            });



            await newStatus.save();

            
            

            res.render('medecines', { 
                medecines: allMedecines, 
                trackers: allTrackers ,
                a:newHours
            });
        } catch (error) {
            res.status(500).json({message:error})
        }
 
})

// update the medecine 

router.get('/:id/edit', async (req, res)=>{
   
    const {id} = req.params.id
    
    return res.render("editMedecine", {id : id})

})

router.put('/:id/edit', async (req, res)=>{
            
        const { id } = req.params;
        const { Name, Dosage, Frequency, dayTaken, Time } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedMedicine = await Medicine.findByIdAndUpdate(
            id,
            { Name, Dosage, Frequency, dayTaken, Time },
            { new: true, runValidators: true }
        );

        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        return res.redirect("/medecines");
        
    })


// delete the medecine 


router.post('/:id', async (req, res)=>{
        
    try {

        const idMedecine = await Medicine.findByIdAndDelete(req.params.id)
        console.log(idMedecine)

        if (!idMedecine) {
            res.status(404).json({message: "medecine not found"})
        }
        // res.status(200).json({message: "Done, Medecine has Deleted"})
        const allMedecines = await Medicine.find({})
        // res.status(200).json(allMedecines)
        res.render('medecines', { medecines : allMedecines });

    } catch (error) {
        res.status(500).json({message:error})
    }

})





module.exports = router;