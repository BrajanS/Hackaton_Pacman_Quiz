import express from 'express';
import {
  createQuestionnaire,
  getAllQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
} from '../controllers/questionnaire.controller.js';

import { authentificationMiddleware } from "../middleware/authentification.js";

const router = express.Router();

router.post("/questionnaires", authentificationMiddleware, createQuestionnaire);            // POST /api/questionnaires
router.get("/questionnaires", authentificationMiddleware, getAllQuestionnaire);             // GET /api/questionnaires
router.get("/questionnaires/:id", getQuestionnaireById);                                     // GET /api/questionnaires/:id
router.put("/questionnaires/:id", authentificationMiddleware, updateQuestionnaireById);      // PUT /api/questionnaires/:id
router.delete("/questionnaires/:id", authentificationMiddleware, deleteQuestionnaireById);   // DELETE /api/questionnaires/:id


export default router;
