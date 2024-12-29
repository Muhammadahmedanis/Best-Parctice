import express from 'express';
// import authRouter from './routes/auth.js';
import authRouter from './src/auth/routes.js';
import dotenv from 'dotenv'
// import { connectDB } from './db/index.js';
import { connectDB } from './src/auth/db.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ENV } from './constant/index.js';

const app = express();
app.use(express.json());
app.use(cookieParser()) // after this res.cokiesParser() return object need for use is cookies ma data bhj or le raha hain
app.use(helmet()); // use to secure out header like in our network tab we can x-powered by express so using header it will remove 
dotenv.config();
connectDB();

app.use("/api/v1/auth" , authRouter);
app.all("*", (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    })
})

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server working");
})