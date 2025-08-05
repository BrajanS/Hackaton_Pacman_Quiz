import UserModel from "../models/users.model.js";
import mongoose from "mongoose";
import argon2 from "argon2";

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
  } catch (err) {
    res.status(500).send("Something went wrong while trying to register");
  }
};

const loginController = async (req, res) => {
  try {
    const requestedLogin = req.body;
    const userExists = await UserModel.findOne({
      username: requestedLogin.username,
    });
    if (!userExists) {
      res.status(404).send("This user doesn't exist");
    } else {
      // Phase to verify hashed password
      const verifyPassword = await argon2.verify(
        userExists.password,
        requestedLogin.password
      );
      //   console.info("ArgonVerif:", verifyPassword);
      //   "Logged-in successfully !"
      res.status(200).json({ ArgonVerif: verifyPassword });
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
