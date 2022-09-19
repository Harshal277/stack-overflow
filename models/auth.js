import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String, default: '' },
    tags: { type: [String] },
    joinedOn: {type: Date, default: Date.now },
    mob: { type: String, required: false }
})

export default mongoose.model("User", userSchema)