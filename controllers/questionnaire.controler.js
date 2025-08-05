const Questionnaire = require('../models/questionnaire.model');

// POST /questionnaires
exports.createQuestionnaire = async (req, res) => {
  try {
    const newQuiz = new Questionnaire(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du questionnaire', error });
  }
};

// GET /questionnaires
exports.getAllQuestionnaires = async (req, res) => {
  try {
    const quizzes = await Questionnaire.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des questionnaires', error });
  }
};

// GET /questionnaires/:id
exports.getQuestionnaireById = async (req, res) => {
  try {
    const quiz = await Questionnaire.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du quiz', error });
  }
};
