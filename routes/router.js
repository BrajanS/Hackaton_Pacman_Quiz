// routes/router.js
import express from "express";
import userRouter from "./user.route.js"; // <- fichier correct
import questionRouter from "./question.routes.js";
import questionnaireRouter from "./questionnaires.routes.js"; // <- fichier correct

const router = express.Router();

router.use("/api", userRouter);
router.use("/api", questionRouter);
router.use("/api/questionnaires", questionnaireRouter); // <- fichier correct

export default router;
