import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    isActivated: {type: Boolean, default: false},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    activationLink: {type: String},
    ethWallets: [{ type: String }],
}, {timestamps: true},)

export default mongoose.model("User", UserSchema)