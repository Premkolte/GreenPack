const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async(req,res) => {
    const { name,email,password } = req.body;
    
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) {return res.status(400).json({message: "User Already Exists"})};

        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({name,email,password:hashedPassword});
        
        const token = jwt.sign({ id: newUser._id},process.env.JWT_SECRET,{expiresIn:"24h"});
        res.status(201).json({user: newUser,token});
    }
    catch(error){
        res.status(500).json({message:"Error registering User",error});
    }
}

const loginUser = async(req,res) => {
    const { email,password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) {return res.status(404).json({ message: "User Not Found"})};

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) { return res.status(400).json({ message: "Invalid Credentials"})};

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn:"24h"});

        res.status(200).json({user,token});
    }
    catch(error){
        res.status(500).json({message: "Error logging in",error});
    }
}


module.exports = { registerUser,loginUser };