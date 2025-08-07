import Questionnaire from '../models/questionnaire.model.js';

// POST /questionnaire
export const createQuestionnaire = async (req, res) => {
  try {
    const userId = req.userId; // ✅ injecté par le middleware d’authentification

    const newQuiz = new Questionnaire({
      ...req.body,
      createdBy: userId
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création du questionnaire',
      error
    });
  }
};

// GET /questionnaire
export const getAllQuestionnaire = async (req, res) => {
  try {
    const quizzes = await Questionnaire.find()
      .populate("questions") // Affiche les objets questions complets
      .populate("createdBy", "username email"); // Affiche les informations de l'utilisateur qui a créé le questionnaire
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des questionnaires', error });
  }
};

// GET /questionnaire/:id
export const getQuestionnaireById = async (req, res) => {
  try {
    const quiz = await Questionnaire.findById(req.params.id)
      .populate("questions") // Affiche les objets questions complets
      .populate("createdBy", "username email"); // Affiche les informations de l'utilisateur qui a créé le questionnaire

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