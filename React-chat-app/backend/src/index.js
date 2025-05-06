import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import {dbConnection} from './lib/db.js';

const app= express();
dotenv.config();

const port=process.env.PORT||5000;

app.use(cors());//cross origin resource sharing

app.use(cookieParser());
app.use(express.json());//extract json data from the request

app.use('/api/auth', authRoutes);

app.listen(port, ()=>{
    console.log('Server is running on port 5000');
    dbConnection();
});
