import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);
export default Questionnaire;
