import jwt from "jsonwebtoken";

const authentificationMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // prettier-ignore
      res.status(401).send("Not Authorized access: No Token received (Login first, to get access)");
    } else {
      const tokenVerif = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (tokenVerif) {
        req.userId = tokenVerif;
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

export { authentificationMiddleware };