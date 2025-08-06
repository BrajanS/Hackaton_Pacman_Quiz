// routes/router.js
import express from "express";
import questionnaireRouter from "./questionnaires.routes.js"; // <- fichier correct
import questionRouter from "./question.routes.js";

const router = express.Router();

router.use("/", questionRouter);
router.use("/", userRouter);

export default router;
