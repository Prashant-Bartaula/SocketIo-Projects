import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
export const  dbConnection=async()=>{
    try {
        // await mongoose.connect(`${process.env.MONGO_URI}`);
        const conn=await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('db connected ', conn.connection.host, conn.connection.name)
    } catch (error) {
        console.log('some error occured', error.message)
    }
}
