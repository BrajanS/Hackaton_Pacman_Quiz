import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel  from "./models/users.model.js";
import Question from "./models/question.model.js";
import Questionnaire from "./models/questionnaire.model.js";

dotenv.config();

const MONGODB_URI ="mongodb://localhost:27017/hackaton_quiz";

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connexion MongoDB établie");

    // Nettoyage des collections
    await UserModel.deleteMany();
    await Question.deleteMany();
    await Questionnaire.deleteMany();

    // ➕ 1 utilisateur
    const user = new User({
      username: "admin01",
      firstName: "Alice",
      lastName: "Martin",
      email: "alice@example.com",
      password: "hashedPassword123" // en vrai : hashé !
    });
    await user.save();
    console.log("👤 Utilisateur inséré :", user.username);

    // ➕ 2 questions créées par l'utilisateur
    const question1 = new Question({
      text: "Comment dit-on 'Hello' en français ?",
      options: [
        { label: "A", isCorrect: true },
        { label: "B", isCorrect: false },
        { label: "C", isCorrect: false }
      ],
      createdBy: user._id
    });

    const question2 = new Question({
      text: "Quelle est la réponse à 'Merci' ?",
      options: [
        { label: "A", isCorrect: false },
        { label: "B", isCorrect: true },
        { label: "C", isCorrect: false }
      ],
      createdBy: user._id
    });

    await question1.save();
    await question2.save();
    console.log("❓ Questions insérées");

    // ➕ 1 questionnaire lié à ces 2 questions
    const questionnaire = new Questionnaire({
      title: "Le français vous salue",
      questions: [question1._id, question2._id],
      createdBy: user._id
    });

    await questionnaire.save();
    console.log("🧾 Questionnaire inséré :", questionnaire.title);

    console.log("✅ Données insérées avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err.message);
    process.exit(1);
  }
};

seedData();
