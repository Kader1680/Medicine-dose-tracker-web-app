const express = require("express")
const app = express()
const router = express.Router()
const path = require("path");
const User = require("../models/User");
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
 

app.use(express.static(path.join(__dirname, "public")));

router.get("/login", (req, res)=>{
   res.render("login")
})
router.get("/register", (req, res)=>{
    res.render("register")
 })
router.post("/register", (req, res)=>{
    try {
        const {username, email, password} = req.body
        console.log({username, email, password})
        const newUser = User.create({username, email, password})
        newUser.save();
        // res.send('user register sucessfuly')
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
 })
 
 


module.exports = router;