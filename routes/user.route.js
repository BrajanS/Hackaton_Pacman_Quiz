import express from "express";
import {
  getUserByIdController,
  getUsersController,
  loginController,
  registerController,
} from "../controllers/user.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.js";

const userRouter = express.Router();

userRouter.get("/users", authentificationMiddleware, getUsersController);
userRouter.get("/users/:id", getUserByIdController);

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

export default userRouter;
