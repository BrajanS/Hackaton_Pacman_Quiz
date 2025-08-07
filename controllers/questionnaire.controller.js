import Questionnaire from '../models/questionnaire.model.js';

// POST /questionnaire
export const createQuestionnaire = async (req, res) => {
  try {
    const { title, description, tags, questions } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Le titre est obligatoire." });
    }

    const newQuiz = new Questionnaire({
      title,
      description,
      tags,
      questions,
      createdBy: req.userId, // middleware JWT
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error("Erreur création questionnaire:", error);
    res.status(500).json({
      message: "Erreur lors de la création du questionnaire",
      error: error.message || error,
    });
  }
};


// GET /questionnaire
export const getAllQuestionnaire = async (req, res) => {
  try {
    const quizzes = await Questionnaire.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des questionnaires', error });
  }
};

// GET /questionnaire/:id
export const getQuestionnaireById = async (req, res) => {
  try {
    const quiz = await Questionnaire.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du quiz', error });
  }
};

// UPDATE /questionnaire/:id
export const updateQuestionnaireById = async (req, res) => {
  try {
    const updatedQuiz = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedQuiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du quiz', error });
  }
};

// DELETE /questionnaire/:id
export const deleteQuestionnaireById = async (req, res) => {
  try {
    const deletedQuiz = await Questionnaire.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.json({ message: 'Quiz supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du quiz', error });
  }
};