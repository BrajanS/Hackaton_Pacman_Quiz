import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true }, // To add: E-mail Regex to verify "abc@example.com"
    quizs: { type: Array, default: [] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
