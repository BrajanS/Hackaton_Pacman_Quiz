 
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        
    },
    isCorrect: {
        type: Boolean,
        required: true 
    }
});

function arrayLimit(val) {
    return val.length >= 2 && val.length <= 5;
}

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    validate : {
      validator: arrayLimit,
      message: "Une question doit avoir entre 2 et 5 options.",
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Question = mongoose.model("Question", questionSchema);
export default Question;