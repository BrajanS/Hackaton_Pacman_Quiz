import express from "express";
import { createQuestion, getQuestions } from "../controllers/question.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.js"; // Attention: Middleware à faire  

const router = express.Router();

// Route pour créer une nouvelle question protégée par authentification
router.post("/questions", authentificationMiddleware, createQuestion);

// Route pour récupérer les questions protégée par authentification
router.get("/questions", authentificationMiddleware, getQuestions);

export default router;