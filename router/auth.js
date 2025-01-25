const express = require("express")
const app = express()
const router = express.Router()
const path = require("path");
const User = require("../models/User");
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

const bcrypt = require("bcrypt")

app.use(express.static(path.join(__dirname, "public")));

router.get("/login", (req, res)=>{
   res.render("login")
})

router.post("/login", async (req, res)=>{
    try {
        const {email, password} = req.body
        // console.log({email, password}) 
        // check the user exist by email
        const user = await User.findOne({email}).select("+password")
        console.log(user.password)
        // console.log("this is password " + user.password)
        // if (!checkUser) {
        //     res.status(401).json({message : "user faild"})
        // }
        // check the password 
        const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`,
            user.password
        )
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });
        // return user info except password
         

        res.redirect("/")
        

    } catch (error) {
        res.send(error)
        
    }
 })
router.get("/register", (req, res)=>{
    res.render("register")
 })
router.post("/register", async (req, res)=>{
    try {
        const {username, email, password} = req.body
        console.log({username, email, password})
        const saltRounds  = 10
        const hashedPassowrd = await bcrypt.hash(password, saltRounds)
        const newUser = await User.create({username, email, password : hashedPassowrd})
        await newUser.save();
        // res.send('user register sucessfuly')
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
 })
 
 


module.exports = router;