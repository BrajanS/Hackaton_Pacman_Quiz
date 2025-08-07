import express from 'express';
import {
  createQuestionnaire,
  getAllQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
} from '../controllers/questionnaire.controller.js';

const questionnaireRouter = express.Router();

questionnaireRouter.post('/', createQuestionnaire);            // POST /api/questionnaires
questionnaireRouter.get('/', getAllQuestionnaire);             // GET /api/questionnaires
questionnaireRouter.get('/:id', getQuestionnaireById);         // GET /api/questionnaires/:id
questionnaireRouter.put('/:id', updateQuestionnaireById);      // PUT /api/questionnaires/:id
questionnaireRouter.delete('/:id', deleteQuestionnaireById);   // DELETE /api/questionnaires/:id


export default questionnaireRouter;
