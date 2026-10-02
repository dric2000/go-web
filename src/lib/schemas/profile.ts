import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  email: z.string().min(1, "L'email est requis.").email("Email invalide."),
  phone: z
    .string()
    .regex(/^(\+229)?[0-9]{8,10}$/, "Numéro de téléphone béninois invalide."),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
