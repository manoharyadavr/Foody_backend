const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const vendorRoutes = require("./routes/vendorRoutes")
const bodyParser = require("body-parser")
const firmRoutes = require("./routes/firmRoutes")
const productRoutes = require("./routes/productRoutes")
const path = require("path")

const app = express()

dotenv.config()

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully!")) 
.catch((error) => console.log("Not connected to DB", error)
)


app.use(bodyParser.json())
app.use("/vendor", vendorRoutes)
app.use("/firm", firmRoutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static("uploads"))

app.use("/home", (req, res) => {
    res.send("<h1>Welcome to Foody</h1>")
})

app.listen(PORT, () => {
    console.log(`The app running on ${PORT}`);    
    if(err){
        console.log(err)
    }
})

