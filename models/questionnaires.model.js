const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  choices: [{
    label: String,
    text: String
  }],
  correctAnswers: [String],
  explanation: String
});

const questionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
