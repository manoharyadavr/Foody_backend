const Vendor = require("../models/Vendor")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")


dotenv.config()

const vendorRegister = async(req, res)=>{
    const {userName, email, password} = req.body;
    try {
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            res.status(400).json("Email already Exists")
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newVendor = new Vendor({
                userName,
                email,
                password: hashedPassword
            });
        await newVendor.save();
        res.status(201).json({message:"Vendor registered successfully...!"});
        console.log("Vendor registered successfully...!");        
        }
    } catch (error) {
        res.status(500).json({message:"Internal server Error"})
        console.error(error);
    }
}


const vendorLogin = async(req, res) => {
    const {email, password} = req.body
    try {
        const vendor = await Vendor.findOne({email})
        if(!email || !(await bcrypt.compare(password, vendor.password))){
            return res.status(400).json({message:"❌ Invalid username or password..!"})
        }
        else{
            const token = jwt.sign({vendorId : vendor._id}, process.env.WhatIsYourName, {expiresIn:"1h"})
            res.status(201).json({message:"✅ Login Successful..!", token})
            console.log(email, token);            
       }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error.."})
        console.error(error);        
    }
}

const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().populate("firm")
        res.json({vendors})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error.."})
    }
}


const getVendorById = async(req, res) => {
    const vendorId = req.params.id 
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({Error:"Vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}


module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}