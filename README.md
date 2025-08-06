# Quizz Multi-niveaux Inclusif

## Objectif du projet

Cette application est pensée pour les formateurs et les apprenants de FLE (Français Langue Étrangère)

En tant que formateur, l’objectif est de pouvoir :
- Créer, modifier et supprimer des questions,
- Créer des questionnaires adaptés aux niveaux et aux besoins des apprenants,
- Organiser le contenu avec des tags (accessibilité, thème, etc.),
- Et permettre une navigation simple, même pour des personnes en difficulté avec le numérique (illettrisme numérique, handicaps).

Pour les apprenants, cela permet :

- De s’auto-évaluer à travers des quiz accessibles,
- D’avoir une expérience adaptée à leur niveau et à leurs capacités.

---

## Technologies utilisées

- Node.js
- Express.js
- MongoDB avec Mongoose
- JSON Web Tokens (JWT) pour l’authentification
- ThunderClient / Postman (tests d’API)
- HTML, CSS, JavaScript

---

## Fonctionnalités principales

- Authentification utilisateur (register, login)
- Gestion des utilisateurs
- Création, modification et suppression de questions
- Création et gestion de questionnaires
- Association de questions à un questionnaire
- Filtres par tags (accessibilité, thème, niveau, etc.)
- Accessibilité pour tous les profils

---

## Membres de l'équipe

- **Brajan** – Authentification et utilisateurs
- **Ilona** – Frontend  
- **Nuno** – CRUD des questions
- **Wilfried** – Gestion des questionnaires

---

## Endpoints de l'API – Questions (par Nuno)

Toutes les routes sont protégées par JWT.

| Méthode | Endpoint         | Description                                   |
| ------- | ---------------- | --------------------------------------------- |
| POST    | `/questions`     | Créer une nouvelle question                   |
| GET     | `/questions`     | Lister les questions créées par l'utilisateur |
| PUT     | `/questions/:id` | Modifier une question existante               |
| DELETE  | `/questions/:id` | Supprimer une question existante              |

### Exemple de corps (POST /questions)

```json
{
  "text": "Quel est le langage utilisé côté serveur ?",
  "options": [
    { "label": "A", "isCorrect": false },
    { "label": "B", "isCorrect": false },
    { "label": "C", "isCorrect": true },
    { "label": "D", "isCorrect": false }
  ]
}
```

---

## Test de l’API

### 1. Login

- Endpoint : `POST /login`
- Réponse : un **cookie JWT** est envoyé

### 2. Ajouter une question

- Utiliser le token (cookie) dans les requêtes suivantes

---

## À compléter par l'équipe

### Endpoints Utilisateurs (Brajan)

| Méthode | Endpoint  | Description          |
| ------- | --------- | -------------------- |
| POST    | /register | Créer un utilisateur |
| POST    | /login    | Se connecter         |

### Endpoints Questionnaires (Will)

| Méthode | Endpoint                           | Description                               |
| ------- | ---------------------------------- | ----------------------------------------- |
| POST    | /questionnaires                    | Créer un questionnaire                    |
| GET     | /questionnaires                    | Lister les questionnaires                 |
| GET     | /questionnaires/\:id               | Récupérer un questionnaire par ID         |
| PUT     | /questionnaires/\:id               | Modifier un questionnaire                 |
| DELETE  | /questionnaires/\:id               | Supprimer un questionnaire                |
| PUT     | /questionnaires/\:id/add-questions | Associer des questions à un questionnaire |

---

## Sécurité et Accessibilité

- Authentification via JWT (middleware)
- Données utilisateurs protégées
- Modèle de données (Questions ↔ Questionnaires ↔ Utilisateurs)
- Structure HTML prévue pour l'accessibilité (frontend à venir)

---

## Lancement du projet

```bash
npm install
npm run dev
```

Base de données : `mongodb://localhost:27017/hackaton_quiz`

---

## Structure du projet (simplifiée)

```
/controllers
  question.controller.js
  questionnaire.controller.js
  user.controller.js

/routes
  question.routes.js
  questionnaires.routes.js
  user.routes.js

/models
  question.model.js
  questionnaire.model.js
  users.model.js

/middleware
  authentification.js

/database
  connectDb.js

app.js
.env
```

