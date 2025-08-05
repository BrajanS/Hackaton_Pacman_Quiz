const express = require('express');
const router = express.Router();
const controller = require('../controllers/questionnaire.controller');

// Créer un nouveau quiz
router.post('/', controller.createQuestionnaire);

// Récupérer tous les quiz
router.get('/', controller.getAllQuestionnaires);

// Récupérer un quiz par ID
router.get('/:id', controller.getQuestionnaireById);

module.exports = router;
