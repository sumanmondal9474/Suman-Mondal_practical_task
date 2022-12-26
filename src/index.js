const express = require("express")

const mongoose = require("mongoose")
const route = require("./route")

const app = express()
mongoose.connect("mongodb+srv://suman:oHy9PfeRXPQ2lfhu@cluster0.xzzuzad.mongodb.net/interview")
    .then(() => console.log("mongoDB is connected"), (err) => console.log(err.message))

app.use(express.json())
app.use(route)

const PORT = 3000

app.listen(PORT, () => { console.log(`App is running on ${PORT}`) })

