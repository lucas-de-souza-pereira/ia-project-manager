import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Le nom du projet est requis."),
  description: z.string().min(1, "La description est requise."),
  contributors: z.array(z.string()),
});
