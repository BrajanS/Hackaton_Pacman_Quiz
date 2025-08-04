import "dotenv/config";
import argon2 from "argon2";
import { connectDB, disconnectDB } from "../database/connectDb.js";
import UserModel from "../models/users.model.js";

const users = [
  {
    username: "Pepito",
    password: "pepitoAmigo_123",
    prenom: "Pepito",
    nom: "Amigo",
    email: "pepito@gmail.com",
  },
];

async function generateSeed() {
  try {
    // #region Connect to MongoDB & Clean all the Users for safety
    await connectDB();
    await UserModel.deleteMany({});
    // #endregion
    const baseUsersProtected = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await argon2.hash(user.password, {
          type: argon2.argon2id,
        });
        return {
          username: user.username,
          password: hashedPassword, // return the same user but with hashed password
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
        };
      })
    );
    await UserModel.insertMany(baseUsersProtected);
    console.info("✅ Successfully generated seed !");
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error("❌ Couldn't generate seed ... :", {
      message: err.message,
      name: err.name,
      path: err.stack.split("\n")[1],
    });
    await disconnectDB();
    process.exit(1);
  }
}
// process.exit(0 or 1) -> Closes terminal service just like CTRL + C, with 0 -> Success and 1 -> Error

generateSeed();
