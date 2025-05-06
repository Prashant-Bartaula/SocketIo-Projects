import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const protectRoute=async(req, res, next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: 'Not authorized, please login'});
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message: 'unauthorized- invalid token'});

        const user=await User.findById(decoded.userId).select('-password');//select everything except password
        if(!user) return res.status(401).json({message: ' user not found'});

        req.user=user
        
        next();
    } catch (error) {
        
    }
}