import { z } from "zod";

export const registerSchema = z.object({
  email: z.email({ error: "Adresse email invalide." }),
  password: z
    .string()
    .min(
      8,
      "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
    )
    .regex(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule",
    )
    .regex(
      /[a-z]/,
      "Le mot de passe doit contenir au moins une lettre minuscule",
    )
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(
      /^[a-zA-Z\d@$!%*?&]*$/,
      "Caractères spéciaux autorisés : @ $ ! % * ? &",
    )
    .optional()
    .or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  email: z.email({ error: "Adresse email invalide." }),
  password: z.string().min(1, "Le mot de passe est requis."),
});

export type LoginInput = z.infer<typeof loginSchema>;
