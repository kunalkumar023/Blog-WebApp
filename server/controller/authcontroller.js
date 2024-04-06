import bcrypt from "bcrypt"
import authModel from "../models/authModel.js";
import jwt  from "jsonwebtoken";

class AuthController{
    static userRegistration = async (req,res)=>{
        const {username,email,password}=req.body;
        console.log(req.body)
        try {
        
        if(username && email && password)
        {
            const isUser =await authModel.findOne({username:username})
            if(!isUser)
            {
                const hashPassword= await bcrypt.hash(password,10);
                const newUser = new authModel({
                    username,
                    email,
                    password:hashPassword,
                })
                const savedUser= await newUser.save();
                if(savedUser)
                {
                    return res.status(200).json({
                        message:"User registerd successfully"
                    })
                }
            }
            else{
                return res.status(400).json({
                    message:"User already exist"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"All fields are required."
            })
        }
    }
    catch(error){
        return res.json({message:error.message})
    }
    };


    static userLogin = async(req,res)=>{
        const {email,password}=req.body;
    
        const isEmail = await authModel.findOne({email:email});
        if(isEmail)
        { 
            if(isEmail.email===email && await bcrypt.compare(password,isEmail.password))
            {
                const token= jwt.sign({usetID:isEmail._id},"kunalprajapati");
                return res.status(200).cookie("token",token,{
                    httpOnly:true,
                    maxAge:15*60*1000,
                }).json({
                    message:"Login Successfully",
                    token,
                    name:isEmail.username
                });
            }
            else{
                return res.status(400).json({
                    message:"Incorrect password"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"email not found:"
            })
        }
    }
}

export default AuthController;