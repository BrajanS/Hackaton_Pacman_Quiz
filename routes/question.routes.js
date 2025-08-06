import express from "express";
import { createQuestion, getQuestions } from "../controllers/question.controller.js";
import verifyToken from "../middlewares/verifyToken.js"; // Attention: Middleware à faire  

const router = express.Router();

// Route pour créer une nouvelle question protégée par authentification
router.post("/questions", verifyToken, createQuestion);

// Route pour récupérer les questions protégée par authentification
router.get("/questions", verifyToken, getQuestions);

export default router;