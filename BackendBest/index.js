// import authRouter from './src/auth/routes.js';
// import { connectDB } from './src/auth/db.js';
import express from 'express';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv'
import { connectDB } from './config/dbConfig.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ENV } from './constant/index.js';
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { NOT_FOUND } from "http-status-codes"
import { sendError } from './utils/responses.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(cookieParser()) // after this res.cokiesParser() return object need for use is cookies ma data bhj or le raha hain
app.use(helmet()); // use to secure out header like in our network tab we can x-powered by express so using header it will remove 
dotenv.config();
connectDB();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
    message: "Too many requests, please try again later.",
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use("/api/v1/auth" , authRouter);

app.all("*", (req, res) => {
    res.status(NOT_FOUND).send(sendError({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    }))
})

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server working");
})