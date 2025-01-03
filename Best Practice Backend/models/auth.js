import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    }
}, {timestamps: true},
)

export default mongoose.model("Users", userSchema);