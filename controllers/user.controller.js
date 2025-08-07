import UserModel from "../models/users.model.js";
import mongoose from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

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
      const { password, ...safeUser } = user; // Removes the password
      if (safeUser) {
        res.status(200).json(safeUser);
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
    const usernameExists = await UserModel.exists({
      username: registerData.username,
    });
    const emailExists = await UserModel.exists({
      email: registerData.email,
    });
    if (usernameExists && emailExists) {
      return res
        .status(409)
        .send(
          "Username and Email already exist, you cannot register as a existing user"
        );
    } else if (usernameExists) {
      return res
        .status(409)
        .send(
          "Username already exists, you cannot register as a existing user"
        );
    } else if (emailExists) {
      return res
        .status(409)
        .send("Email already exists, you cannot register as a existing user");
    } else {
      const { password, email, ...userData } = registerData;
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
      });
      if (hashedPassword) {
        const createUser = await UserModel.create({
          ...userData,
          email: email.toLowerCase(),
          password: hashedPassword,
        });
        res.status(201).json(createUser);
      } else {
        res.status(500).send("Couldn't hash the password");
      }
    }
  } catch (err) {
    res.status(500).send("Something went wrong while trying to register");
  }
};

const loginController = async (req, res) => {
  try {
    const requestedLogin = req.body;
    const userExists = await UserModel.findOne({
      email: requestedLogin.email.toLowerCase(),
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

const logoutController = async (_, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).send("Logged Out successfully");
  } catch (err) {
    res.status(500).send("Something went wrong, couldn't Logout ...");
  }
};

export {
  getUsersController,
  getUserByIdController,
  registerController,
  loginController,
  logoutController,
};
