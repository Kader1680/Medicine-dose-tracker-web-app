const express = require("express")
const app = express()
const path = require("path");
const PORT = 3000
const mongoose = require("mongoose")

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const home = require("./router/home");


const methodOverride = require('method-override');

// Middleware to handle method override
app.use(methodOverride('_method'));




const Medecine = require('./models/Medicine');
const medecine = require("./router/medecines")
const deleteMedecine = require("./router/deleteMedecine")


// ------------------- THE API SECTION ---------------------------
// app.use("/api", medecine)
// ------------------- THE Client SECTION ---------------------------

app.use("/", medecine)
 

app.use("/", home)

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const addMedecine = require("./router/addMedecine")
const report = require("./router/report")
const tracker = require("./router/tracker")
 

app.use("", addMedecine)
app.use("", report)
app.use("", tracker)

// authentication services
const authenticationRouter = require("./router/auth")
app.use("", authenticationRouter)
app.listen(PORT, ()=>console.log(`the server is start running on the port ${PORT}`))