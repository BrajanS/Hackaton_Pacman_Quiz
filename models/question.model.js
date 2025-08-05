import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  label: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Question", questionSchema);
