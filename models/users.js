import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: 'user',
    }
}, { timestamps: true, strict: true })

const userModel = mongoose.model('userModel', UserSchema, 'users')
export default userModel