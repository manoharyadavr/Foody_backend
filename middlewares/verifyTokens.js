const Vendor = require("../models/Vendor")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()
 
const verifyToken = async(req, res, next) => {
    const token = req.headers.token

    if(!token){
       return res.status(401).json({Error:"Token is required..!"})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.WhatIsYourName)
        const vendor = await Vendor.findById(decodedToken.vendorId)

        if(!vendor){
            return res.status(402).json({error:"Vender not found"})
        }

        req.vendorId = vendor._id

        next()

    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Ivalid Token"})
        
    }
}


module.exports = verifyToken