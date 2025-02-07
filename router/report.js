const express = require("express")
const app = express()
const router = express.Router()
const medecineController = require("../controller/medecineContr")
const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
 
const Medecine = require("../models/Medicine")
const { totalmem } = require("os")

app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

router.get('/report', async (req, res)=>{
        
        try {
            const allMedecines = await Medecine.countDocuments()
            // const medecineMissed = await Medecine.find({})
      

            const Dates = await  Medecine.find({}, "Time -_id");
            
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

            const missedMedecineCounter = newHours.filter(el => el < 0).length;
            const tackenMedecineCounter = newHours.filter(el => el > 0).length;
            
            

            res.render('report', {
                totalMedeecines: allMedecines,
                Missed : missedMedecineCounter,
                Tacken : tackenMedecineCounter,



            });
        } catch (error) {
            res.status(500).json({message:error})
        }

})





module.exports = router