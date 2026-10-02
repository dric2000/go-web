import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "L'email est requis.").email("Email invalide."),
  password: z.string().min(1, "Le mot de passe est requis."),
  remember: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Le nom est requis."),
    email: z.string().min(1, "L'email est requis.").email("Email invalide."),
    phone: z
      .string()
      .regex(
        /^(\+229)?[0-9]{8,10}$/,
        "Numéro de téléphone béninois invalide.",
      ),
    password: z.string().min(8, "8 caractères minimum."),
    password_confirmation: z.string().min(1, "Confirme ton mot de passe."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["password_confirmation"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
