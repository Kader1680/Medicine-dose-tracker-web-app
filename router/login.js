const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
 

app.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res)=>{
   res.render("login")
})


module.exports = router;