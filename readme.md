# 🚀 IA Project Manager (Dashboard IA)

Bienvenue dans **IA Project Manager**, un tableau de bord moderne de gestion de projets assisté par Intelligence Artificielle.

## 🌟 Fonctionnalités Clés

- **Authentification Sécurisée** : Système complet avec JWT et gestion de sessions.
- **Gestion de Projets & Équipes** : Création de projets, attribution de membres avec rôles.
- **IA Task Generator** : Utilisation de **Mistral AI** et **LlamaIndex** pour générer des tâches intelligentes.
- **Design Full Responsive** : Expérience optimisée pour **Mobile**, **Tablette** et **Desktop**.
- **Interface Premium** : Interface fluide construite avec Next.js 15+ et Tailwind CSS 4.

## 📸 Aperçu du Projet

|                         Dashboard (Desktop)                         |                        Gestion IA (Mobile)                         |
| :-----------------------------------------------------------------: | :----------------------------------------------------------------: |
| ![Project Preview](/frontend/public/screenshots/gestion-projet.png) | ![Mobile Preview](/frontend/public/screenshots/ajout-tache-ia.png) |

## 🏗️ Architecture du Projet

Le projet est divisé en deux parties principales :

### 🖥️ Front-end (Next.js 15)

L'architecture suit une organisation par couches pour une meilleure maintenabilité et évolutivité :

- **`/app`** : Routage (App Router) et Layouts de l'application.
- **`/components`** : Composants UI réutilisables et composants métiers (features).
- **`/hooks`** : Logique métier extraite (ex: `useManageTaskIA`) pour assurer la réutilisabilité et la clarté du code.
- **`/contexts`** : Gestion des états globaux (Authentification, Thème, UI).
- **`/lib`** : Fonctions utilitaires, configuration des clients API et instances de librairies tierces.
- **`/types`** : Centralisation des définitions TypeScript pour un typage fort à travers tout le projet.

### ⚙️ Back-end (Node.js/Express)

- **API REST** : Architecture modulaire entièrement typée.
- **Prisma ORM** : Gestion de la base de données (SQLite/PostgreSQL) et intégrité des données.
- **IA Integration** : Moteur de génération utilisant Mistral AI et LlamaIndex pour le traitement du langage naturel.

## 🛠️ Stack Technique

### Frontend

- **Framework** : Next.js 15+ (TypeScript)
- **Styling** : Tailwind CSS 4 & Shadcn/UI
- **Gestion de formulaires** : React Hook Form & Zod

### Backend

- **Runtime** : Node.js (TypeScript)
- **Framework** : Express
- **ORM** : Prisma
- **Documentation** : Swagger UI

## 🚀 Installation et Démarrage

### 1. Configuration du Backend

```bash
cd backend
npm install
# Crée ton fichier .env basé sur .env.example
npx prisma db push
npm run seed
npm run dev
```

### 2. Configuration du Frontend

```bash
cd frontend
npm install
npm run dev
```

# Identifiants

- **Email** : `alice@example.com` || `bob@example.com`
- **Mot de passe** : `password123`

## 📚 Documentation API

Accédez à la documentation Swagger sur `http://localhost:8000/api-docs` une fois le serveur backend lancé.

---

_Projet réalisé dans le cadre du parcours Développeur IA chez OpenClassrooms._
