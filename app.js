// Importation des modules (DotEnv doit être toujours appeler en 1er)
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/connectDb.js";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";

// Chargement le fichier .env
dotenv.config();

// Création de l'application Express
const app = express();

// Définition du port (défaut 3000)
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cookieParser());

// Route principale pour tester si l'API fonctionne
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Quizz !");
});

app.use("/", router);

// Démarrage du serveur une fois connecté à MongoDB
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
