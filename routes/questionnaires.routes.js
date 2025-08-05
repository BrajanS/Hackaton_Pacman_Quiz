// routes/questionnaire.routes.js
import express from 'express';
import Questionnaire from '../models/questionnaire.model.js';

const router = express.Router();

// GET tous les questionnaires
router.get('/', async (req, res) => {
  try {
    const quizzes = await Questionnaire.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

export default router;
