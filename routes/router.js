// routes/router.js
import express from "express";
import questionnaireRouter from "./questionnaires.routes.js"; // <- fichier correct

const router = express.Router();

// Toutes les routes de quiz seront disponibles à /api/questionnaires
router.use("/questionnaires", questionnaireRouter);

export default router;
