// models/countryModel.js
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        code: {
            type: String,
            required: true,
            trim: true,
            unique: true, 
        },
        dialCode: {
            type: String,
            required: true, 
        },
        currency: {
            type: String,
            trim: true, 
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);
export default Country;
