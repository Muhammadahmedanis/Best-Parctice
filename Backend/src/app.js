import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import mongoSanitize from "express-mongo-sanitize";
// import { job } from "./utils/cron-job.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middleware Configurations
app.use(cors({
  origin: [process.env.ALLOWED_ORIGIN_1, process.env.ALLOWED_ORIGIN_2], // Array of allowed origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter)

// Handle Undefined Routes
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export { app };
