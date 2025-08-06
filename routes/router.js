import express from "express";
import userRouter from "./user.route.js";
import questionRouter from "./question.routes.js";

const router = express.Router();

router.use("/", questionRouter);
router.use("/", userRouter);

export default router;
