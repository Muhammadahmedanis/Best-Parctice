import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;

dotenv.config({
    path: "./env"
})


//Database Connection
connectDB()
.then(PORT, () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.log("MONgoDB connection Failed", err));