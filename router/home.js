const express = require("express")
const app = express()
const router = express.Router()
const medecineController = require("../controller/medecineContr")
const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
 
const Medecine = require("../models/Medicine")
router.get('/', (req, res)=>{
    res.render('home')
})

const bodyParser = require('body-parser');

app.use(express.json());


app.use(express.urlencoded({ extended: true }));





module.exports = router