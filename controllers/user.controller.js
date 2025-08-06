import UserModel from "../models/users.model.js";
import mongoose from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { registerUserSchema } from "../validators/register.validator.js";

const getUsersController = async (_, res) => {
  try {
    const users = await UserModel.find({}).lean();
    if (users) {
      const safeUsers = users.map((data) => {
        const { password, ...safeUser } = data;
        return safeUser;
      });
      res.status(200).json(safeUsers);
    } else {
      res.status(404).send("Couldn't find users");
    }
  } catch (err) {
    res.status(500).send("Something went wrong", err);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await UserModel.findById(userId).lean();
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Couldn't find the user");
      }
    } else {
      res.status(401).send("Wrong ObjectID syntax...");
    }
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong while trying to get a User by ID");
  }
};

const registerController = async (req, res) => {
  try {
    const registerData = req.body;
  } catch (err) {
    res.status(500).send("Something went wrong while trying to register");
  }
};

const loginController = async (req, res) => {
  try {
    const requestedLogin = req.body;
    const userExists = await UserModel.findOne({
      email: requestedLogin.email,
    }); // Search User by his Email
    if (!userExists) {
      res.status(404).send("This user doesn't exist");
    } else {
      // Phase to verify hashed password
      const verifyPassword = await argon2.verify(
        userExists.password,
        requestedLogin.password
      );
      if (verifyPassword) {
        // #region EXPIRE TIME CONFIGS FOR SYNCRONIZING: TOKEN AND COOKIE TIME
        // Value is the time Integer that depends on Duration: ["m" minutes, "h" hours]
        const intervalTypes = ["m", "h"];
        const expireTime = { value: 2, duration: intervalTypes[1] }; // -> 2h
        const cookieTimeMultiplier =
          expireTime.duration === intervalTypes[1]
            ? 60 * 60 * 1000 // 1 hour multiplier
            : 60 * 1000; // 1 minute multiplier
        // #endregion --------------------------------------------------------
        // prettier-ignore
        const token = jwt.sign({ id: userExists._id}, process.env.JWT_SECRET_KEY, { expiresIn: `${expireTime.value}${expireTime.duration}` }); // Signs a Token
        // Makes a secure cookie 'jwt' containing the Token
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: expireTime.value * cookieTimeMultiplier,
        });
        res.status(200).json({
          message: "Logged-in successfully !",
        });
      } else {
        res.status(400).json({
          message: "Can't login, the Email or the Password is wrong",
        });
      }
    }
  } catch (err) {
    res.status(500).send("Something went wrong while trying to login");
  }
};

export {
  getUsersController,
  getUserByIdController,
  registerController,
  loginController,
};
