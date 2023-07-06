const bcrypt = require('bcrypt');

const User = require('../models/User')
const saltRounds = 10;


//signup routes

exports.Signup= async(req,res)=>{

    try {
        const {name,email,password,role}=req.body;
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                sucess:false,
                message:"user already exist"
            })
        }
        // secure password

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10);
            
        } catch (error) {
            return res.status(500).json({
                sucess:false,
                message:"error in  hashing password"
            })
            
        }

        // CREATE USER

        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            sucess:true,
            message:"user create successfully"
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be created ,please try again later"
        })
        
    }

}