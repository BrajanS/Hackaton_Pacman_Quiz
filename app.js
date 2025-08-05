// ✅ Importation des modules (dotenv toujours en premier)
import dotenv from "dotenv";
dotenv.config(); // Chargement du fichier .env

import express from "express";
import { connectDB } from "./database/connectDb.js";
import router from "./routes/router.js";

// ✅ Création de l'application Express
const app = express();

// ✅ Définition du port (fallback sur 3000 si non défini dans .env)
const PORT = process.env.PORT || 3000;

// ✅ Middleware pour analyser les requêtes JSON
app.use(express.json());

// ✅ Route test pour vérifier que l'API fonctionne
app.get("/", (req, res) => {
  res.send("✅ Bienvenue sur l'API Quizz !");
});

// ✅ Intégration des routes principales
app.use("/api", router); // Toutes les routes commenceront par /api (bonne pratique)

// ✅ Connexion DB + démarrage serveur
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Échec du démarrage du serveur :", error.message);
    process.exit(1); // Arrêter le processus en cas d'erreur critique
  }
};

startServer();
