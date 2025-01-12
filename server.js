const express = require("express")
const app = express()
const ejs = require("ejs")
const path = require("path");
const {MongoClient} = require("mongodb")
const url = "mongodb+srv://root:0000@medtracker.qiq8b.mongodb.net/?retryWrites=true&w=majority&appName=medtracker"

// connnect to client cluster
const client = new MongoClient(url)


async function run() {
    try {

        await client.connect();

        console.log("Successfully connected to Atlas");

    } catch (err) {

        console.log(err.stack);

    }

    finally {

        await client.close();

    }

}
run().catch(console.dir);

app.set("views", path.join(__dirname, "views"));
 

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/', (req, res)=>{
    
})
app.get('/login', (req, res)=>{
    res.send('hellow from the login')
})



app.listen('3000', ()=>console.log("the server is start running"))