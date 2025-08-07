// routes/router.js
import express from "express";
import questionnaireRouter from "./questionnaires.routes.js"; // <- fichier correct
import questionRouter from "./question.routes.js";
import userRouter from "./user.route.js"; // <- fichier correct

const router = express.Router();

router.use("/", questionRouter);
router.use("/", userRouter);

export default router;
