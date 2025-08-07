import jwt from "jsonwebtoken";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validators/entry.validator.js";

const registerValidator = async (req, res, next) => {
  try {
    const { value: joiVal, error: joiErr } = registerUserSchema.validate(
      req.body
    );
    if (!joiErr) {
      req.body = joiVal;
      next();
    } else {
      res.status(400).json({ Error: joiErr.message });
    }
  } catch (err) {
    console.error("Something wrong happened while validating register:", err);
    res.status(500).send("Something wrong happened while validating register");
  }
};

const loginValidator = async (req, res, next) => {
  try {
    const { value: joiVal, error: joiErr } = loginUserSchema.validate(req.body);
    if (!joiErr) {
      req.body = joiVal;
      next();
    } else {
      res.status(400).json({ Error: joiErr.message });
    }
  } catch (err) {
    console.error("Something wrong happened while validating login:", err);
    res.status(500).send("Something wrong happened while validating login");
  }
};

const authentificationMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // prettier-ignore
      res.status(401).send("Not Authorized access: No Token received (Login first, to get access)");
    } else {
      const tokenVerif = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (tokenVerif) {
        req.userId = tokenVerif.id;
        next();
      } else {
        res.status(401).send("Invalid Token, failed Verification");
      }
    }
  } catch (err) {
    console.error({
      Authentification_failed: err.message,
      name: err.name,
      errorSource: err.stack.split("\n")[1],
    });
    res.status(500).send("Authentification Failed !");
  }
};

export { authentificationMiddleware, registerValidator, loginValidator };
