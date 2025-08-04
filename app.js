// Importation des modules 
import express from "express";
 
import dotenv from "dotenv";

// Chargement le fichier .env
dotenv.config();

// Création de l'application Express
const app = express();

// Définition du port (défaut 3000)
const PORT = process.env.PORT || 3000;


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route principale pour tester si l'API fonctionne
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Quizz !");
});

// Démarrage du serveur une fois connecté à MongoDB
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
  
  