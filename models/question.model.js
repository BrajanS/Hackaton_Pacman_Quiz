import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  choices: [{ label: String, text: String }],
  correctAnswers: [String],
  explanation: String,
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
