import express from "express";
import {
  getUserByIdController,
  getUsersController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/user.controller.js";
import {
  authentificationMiddleware,
  loginValidator,
  registerValidator,
} from "../middleware/authentification.js";

const userRouter = express.Router();

userRouter.get("/users", authentificationMiddleware, getUsersController);
userRouter.get("/users/:id", getUserByIdController);

userRouter.post("/register", registerValidator, registerController);
userRouter.post("/login", loginValidator, loginController);
userRouter.post("/logout", logoutController);

export default userRouter;
