import { Router } from "express";
import { getUsers, searchUsers } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Toutes les routes ici nécessitent une authentification
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Rechercher des utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 */
router.get("/search", searchUsers);

export default router;
