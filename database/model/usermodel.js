import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    // provided by the user
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    countryCode: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },

    // backend
    lastLogin: {
        type: Date
    },
    loginStatus: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    Reposts:[{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    }]
    

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
