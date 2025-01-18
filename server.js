const express = require("express")
const app = express()
const path = require("path");
const PORT = 3000
const mongoose = require("mongoose")

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const login = require("./router/login")
const home = require("./router/home");



const Medecine = require('./models/Medicine');
const medecine = require("./router/medecines")
app.use("/login", login)


app.use("/api/medecines", medecine)
app.use("/medecines", medecine)

app.use(express.json()); // This middleware is needed to parse the request body

app.post('/api/add', async (req, res) => {
  try {
    
    

    
    const connectDB = require("./config/db")
    const newMedicine = await Medecine.create(req.body); 

    // Send a success response with the created medicine data
    res.status(201).json({ success: true, data: newMedicine });
  } catch (error) {
    // Handle any errors by sending a failure response
    res.status(400).json({ success: false, message: error.message });
  }
});


app.use("/", home)







app.listen(PORT, ()=>console.log(`the server is start running on the port ${PORT}`))