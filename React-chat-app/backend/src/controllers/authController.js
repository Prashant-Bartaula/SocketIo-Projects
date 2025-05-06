import User from "../models/userModel.js";
import {generateToken} from "../lib/utils.js";
import bcryptjs from "bcryptjs";
export const signup=async (req,res)=>{
    const {email, fullName, password}=req.body;
    try {
        if(!email || !fullName || !password){
            return res.status(400).send({message: 'All fields are required'})
        }
        if(password.length < 6){
            return res.status(400).send({message: 'Password should be at least 6 characters long'})
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'})
        }
        
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password, salt);

        const newUser=new User({
            email,
            fullName,
            password: hashedPassword
        })

        if(newUser){
            const savedUser=await newUser.save();
            generateToken(savedUser._id, res);//we user res so that cookie can be sent as response through generateToken function
            res.status(201).json({
                _id:savedUser._id,
                fullName:savedUser.fullName,
                email:savedUser.email,
                profilePic:savedUser.profilePic,
            });
        }else{
            res.status(400).json({message: 'Invalid user data'})
        }
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: 'internal server error '})
    }
}

export const login=async(req,res)=>{
    const {email, password}=req.body;
    try {
        if(!email || !password){
            return res.status(400).send({message: 'All fields are required'})
        }
        if(password.length < 6){
            return res.status(400).send({message: 'Password should be at least 6 characters long'})
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'User does not exist'})
        }else{
            const isCorrect= await bcryptjs.compare(password, user.password);
            if(!isCorrect) return res.status(400).json({message: 'Incorrect password'});
            generateToken(user._id, res);
            res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic,
            });
        }
        
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: 'internal server error '})
    }
}
export const logout=async(req,res)=>{
   try {
    res.cookie('jwt', '', {maxAge:0});
    res.status(200).json({message: 'logged out successfully'});
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: 'internal server error '})
   }
}