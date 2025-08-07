import express from "express";
import {
  getUsersController,
  getUserByIdController,
  loginController,
  registerController,
} from "../controllers/user.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.js";

const userRouter = express.Router();

userRouter.get("/users", authentificationMiddleware, getUsersController);
userRouter.get("/users/:id", authentificationMiddleware, getUserByIdController);

userRouter.post("/login", loginController);
userRouter.post("/register", registerController);

export default userRouter;
