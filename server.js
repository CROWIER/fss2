const express = require("express")
const employeesRoutes = require("./routes/employees")
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require("mongoose")

const  AuthRoute = require("./routes/auth")
const app = express()

const SERVER_PORT = 3001

app.use(express.json())
app.use(express.urlencoded())

app.use(bodyParser.json())
app.use(cors())

const DB_CONNECTION_STRING = "mongodb+srv://Askar:Askar2002@cluster0.iftn8ij.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use("/", employeesRoutes)
app.use("/", AuthRoute)

app.route("/")

    .get((req, res) => {
        res.send("<h1>Assignment 1</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})