import express from "express";
import {
  getUserByIdController,
  getUsersController,
  loginController,
  registerController,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/users", getUsersController);
userRouter.get("/users/:id", getUserByIdController);

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

export default userRouter;
