import "dotenv/config";
import argon2 from "argon2";

const users = [
  {
    username: "Pepito",
    password: "pepitoAmigo_123",
    prenon: "Pepito",
    nom: "Amigo",
    email: "pepito@gmail.com",
    quizs: [],
  },
];

async function generateSeed() {
  try {
    const hashedPassword = await argon2.hash(user.password, {
      type: argon2.argon2id,
    });
    console.info("✅ Successfully generated seed !");
  } catch (err) {
    console.error("❌ Couldn't generate seed ... :", {
      message: err.message,
      name: err.name,
      path: err.stack.split("\n")[1],
    });
  }
}

generateSeed();
