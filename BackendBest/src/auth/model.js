import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    }

}, {timestamps: true}
)

export default mongoose.model("Users", usersSchema);