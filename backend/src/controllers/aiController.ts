import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Document, SentenceSplitter } from "llamaindex";
import { Mistral } from "@mistralai/mistralai";
import { AuthRequest } from "../types";
import { sendSuccess, sendError, sendServerError } from "../utils/response";
import { hasProjectAccess } from "../utils/permissions";

const prisma = new PrismaClient();

export const generateTasksWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.projectId || req.params.id;
    const { prompt } = req.body;
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      sendError(res, "Utilisateur non authentifié", "UNAUTHORIZED", 401);
      return;
    }

    if (!prompt || typeof prompt !== "string") {
      sendError(res, "Prompt invalide ou manquant", "INVALID_PROMPT", 400);
      return;
    }

    const hasAccess = await hasProjectAccess(authReq.user.id, projectId);
    if (!hasAccess) {
      sendError(res, "Accès refusé au projet", "FORBIDDEN", 403);
      return;
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      sendError(res, "Clé API Mistral introuvable", "MISSING_API_KEY", 500);
      return;
    }

    // 1. Récupération des tâches existantes via Prisma
    const tasks = await prisma.task.findMany({
      where: { projectId },
      select: { title: true, description: true }
    });

    const documents = tasks.map(
      (task) => new Document({ text: `Tâche existante: ${task.title}. Description: ${task.description || "Aucune"}` })
    );

    if (documents.length === 0) {
      documents.push(new Document({ text: "Aucune tâche existante." }));
    }

    // 2. Préparation RAG : Chunking et récupération du contexte avec LlamaIndex
    const parser = new SentenceSplitter();
    const nodes = parser.getNodesFromDocuments(documents);

    // Concaténer le contexte pertinent extrait par le splitter
    const context = nodes.map(n => n.getText()).join("\n");

    // 3. Appel à l'API Mistral
    const client = new Mistral({ apiKey: apiKey });

    const systemMessage = `Tu es un assistant expert en gestion de projet.
Voici le contexte des tâches déjà existantes dans le projet de l'utilisateur :
---
${context}
---
Demande de l'utilisateur : "${prompt}".
En te basant sur cette demande, génère une liste de nouvelles tâches ultra-pertinentes. Fais attention à ne pas créer de doublons avec les tâches existantes ci-dessus.
Génère un STRICT MAXIMUM de 3 à 4 tâches essentielles. Concentre-toi sur la qualité et la concision. Ne crée pas une avalanche de tâches.
IMPORTANT : TU DOIS RENVOYER STRICTEMENT UN TABLEAU JSON VALIDE. Aucun texte avant, aucun texte après, pas de bloc de code Markdown, juste le JSON brut.
Format attendu: [{"title": "nom de la tâche", "description": "détails de la tâche"}]`;

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: systemMessage }],
    });

    // 4. Extraction et Parsing
    let generatedTasks = [];
    try {
      const content = chatResponse.choices?.[0]?.message?.content?.toString() || "[]";
      // Nettoyage au cas où l'IA ajouterait des balises markdown
      const cleanedJson = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      generatedTasks = JSON.parse(cleanedJson);
    } catch(e) {
      console.error("Erreur de parsing JSON depuis l'IA:", e);
      sendError(res, "L'IA n'a pas pu générer un format JSON valide", "LLM_FORMAT_ERROR", 500);
      return;
    }

    sendSuccess(res, "Tâches générées avec succès", { tasks: generatedTasks }, 200);

  } catch (error) {
    console.error("Erreur serveur IA RAG:", error);
    sendServerError(res, "Erreur interne lors de la génération avec l'IA");
  }
};
