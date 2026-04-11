import { z } from "zod";
import { parse, isValid } from "date-fns";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().min(1, "La description est requise."),
  dueDate: z
    .string()
    .min(1, "La date d'échéance est requise.")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Le format doit être JJ/MM/AAAA",
    )
    .refine(
      (val) => {
        const parsed = parse(val, "dd/MM/yyyy", new Date());
        return isValid(parsed);
      },
      { message: "Cette date n'existe pas dans le calendrier." },
    ),
  assigneeIds: z.array(z.string()),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});
