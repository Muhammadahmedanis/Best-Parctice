import express from 'express';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv'
import { connectDB } from './db/index.js';
import helmet from 'helmet';

const app = express();
app.use(helmet()); // use to secure out header like in our network tab we can x-powered by express so using header it will remove 
dotenv.config();
connectDB();
app.use("/", (req, res) => {
    res.send("hello world")
})
app.use(express.json());
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server working");
})