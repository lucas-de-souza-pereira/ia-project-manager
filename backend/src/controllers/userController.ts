import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types";
import { sendSuccess, sendError, sendServerError } from "../utils/response";

const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs de l'application
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         users:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/User'
 *       401:
 *         description: Non authentifié
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      sendError(res, "Utilisateur non authentifié", "UNAUTHORIZED", 401);
      return;
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    sendSuccess(res, "Utilisateurs récupérés avec succès", { users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    sendServerError(res, "Erreur lors de la récupération des utilisateurs");
  }
};

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Rechercher des utilisateurs pour l'autocomplete
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Terme de recherche (nom ou email)
 *         example: "alice"
 *     responses:
 *       200:
 *         description: Utilisateurs trouvés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         users:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/User'
 *       400:
 *         description: Paramètre de recherche invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * Rechercher des utilisateurs pour l'autocomplete (Déplacé depuis projectController)
 * GET /users/search
 */
export const searchUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { query } = req.query;
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      sendError(res, "Utilisateur non authentifié", "UNAUTHORIZED", 401);
      return;
    }

    if (!query || typeof query !== "string") {
      sendError(res, "Paramètre de recherche requis", "MISSING_QUERY", 400);
      return;
    }

    const searchQuery = query.trim();
    if (searchQuery.length < 2) {
      sendError(
        res,
        "La recherche doit contenir au moins 2 caractères",
        "INVALID_QUERY",
        400,
      );
      return;
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: searchQuery,
            },
          },
          {
            name: {
              contains: searchQuery,
            },
          },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
      take: 10,
      orderBy: [{ name: "asc" }, { email: "asc" }],
    });

    sendSuccess(res, "Utilisateurs trouvés", { users });
  } catch (error) {
    console.error("Erreur lors de la recherche d'utilisateurs:", error);
    sendServerError(res, "Erreur lors de la recherche d'utilisateurs");
  }
};
