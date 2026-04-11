import { z } from "zod";

export const profileSchema = z
  .object({
    lastName: z.string().min(1, "Le nom est requis"),
    firstName: z.string().min(1, "Le prénom est requis"),
    email: z.email({ error: "L'email est invalide" }),
    currentPassword: z.string().optional().or(z.literal("")),
    newPassword: z
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
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message:
        "Le mot de passe actuel est requis pour modifier votre mot de passe",
      path: ["currentPassword"],
    },
  );

export type ProfileData = z.infer<typeof profileSchema>;
