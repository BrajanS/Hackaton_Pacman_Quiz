import express from 'express';
import {
  createQuestionnaire,
  getAllQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
} from '../controllers/questionnaire.controller.js';

const router = express.Router();

router.post('/', createQuestionnaire);            // POST /api/questionnaires
router.get('/', getAllQuestionnaire);             // GET /api/questionnaires
router.get('/:id', getQuestionnaireById);         // GET /api/questionnaires/:id
router.put('/:id', updateQuestionnaireById);      // PUT /api/questionnaires/:id
router.delete('/:id', deleteQuestionnaireById);   // DELETE /api/questionnaires/:id


export default router;
