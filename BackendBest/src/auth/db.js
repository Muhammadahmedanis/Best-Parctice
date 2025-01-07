import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected");
    } catch (error) {
        console.log(error);
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log("mongodb connection closed");
        }
        process.exit(1);
    }
}

process.on('SIGINT', async (params) => {
    console.log("Application is terminating...");
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log("Mongodb connection closed");
    }
    process.exit(0);
})