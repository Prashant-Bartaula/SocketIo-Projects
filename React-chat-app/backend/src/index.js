import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {dbConnection} from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app= express();
dotenv.config();

const port=process.env.PORT||5000;


app.use(cookieParser());
app.use(express.json());//extract json data from the request
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));//cross origin resource sharing

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, ()=>{
    console.log('Server is running on port 5000');
    dbConnection();
});
