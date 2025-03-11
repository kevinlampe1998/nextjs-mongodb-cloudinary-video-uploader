import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);