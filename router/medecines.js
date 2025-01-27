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

            // const distance = currentTime - hours;
            const allHours = await  Medicine.find({}, "Time -_id");;
            

            console.log(allHours)
            // var countDownDate = new Date().getDate();


            // allHours.map((el)=> {
            //     const formatHour = allHours.join(":00")
            // })

            // Get today's date and time
            // var now = new Date().getHours();
            
            // Find the distance between now and the count down date
            // var distance = countDownDate - now;
                
            // Time calculations for days, hours, minutes and seconds

            // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                
            // Output the result in an element with id="demo"
            // console.log(hours)
                
            // If the count down is over, write some text 
            

            res.render('medecines', { 
                medecines: allMedecines, 
                trackers: allTrackers ,
                a:allHours
            });
        } catch (error) {
            res.status(500).json({message:error})
        }
 
})

// update the medecine 
router.get('/:id/edit', async (req, res)=>{
        
        const { id } = req.params;   
        const { Name, Dosage, Frequency } = req.body;   // destrucor data from request body

         
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedMedicine = await Medicine.findByIdAndUpdate(
            id,
            { Name, Dosage, Frequency },  
            { new: true }  
        );

        
        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

         
        res.status(200).json({ message: "Medicine updated successfully", updatedMedicine })
        
    
    })


// delete the medecine 


router.delete('/:id', async (req, res)=>{
        
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