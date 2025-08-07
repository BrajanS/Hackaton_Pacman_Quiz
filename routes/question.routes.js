import express from "express";
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from "../controllers/question.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.js"; // Attention: Middleware à faire  

const router = express.Router();

// Route pour créer une nouvelle question (protégée par authentification)
router.post("/questions", authentificationMiddleware, createQuestion);

// Route pour récupérer les questions (protégée par authentification)
router.get("/questions", authentificationMiddleware, getQuestions);

// Route pour changer les questions (protégée par authentification)
router.put("/questions/:id", authentificationMiddleware, updateQuestion);

// Route pour effacer les questions (protégée par authentification)
router.delete("/questions/:id", authentificationMiddleware, deleteQuestion);


export default router;