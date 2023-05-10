import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: [true, "That email address is already in use"],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,"Please provide a valid email address",],
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    image: {
        type: String,
    }
});

export default models.User || model("User", userSchema);