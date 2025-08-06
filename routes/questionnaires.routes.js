import express from 'express';
import {
  createQuestionnaire,
  getAllQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
} from '../controllers/questionnaire.controller.js';

const router = express.Router();

router.post('/', createQuestionnaire);            // POST /questionnaires
router.get('/', getAllQuestionnaires);            // GET /questionnaires
router.get('/:id', getQuestionnaireById);         // GET /questionnaires/:id
router.put('/:id', updateQuestionnaireById);      // PUT /questionnaires/:id
router.delete('/:id', deleteQuestionnaireById);   // DELETE /questionnaires/:id

export default router;
