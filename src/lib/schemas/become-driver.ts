import { z } from "zod";

export const identitySchema = z.object({
  documentType: z.enum(["CNI", "PASSPORT", "CIP"]),
  file: z
    .instanceof(File, { message: "Choisis un fichier." })
    .refine((f) => f.size > 0, "Choisis un fichier."),
});

export type IdentityValues = z.infer<typeof identitySchema>;

export const licenseSchema = z.object({
  licenseNumber: z
    .string()
    .min(10, "10 caractères minimum."),
});

export type LicenseValues = z.infer<typeof licenseSchema>;

export const vehicleSchema = z.object({
  marque: z.string().min(1, "La marque est requise."),
  modele: z.string().min(1, "Le modèle est requis."),
  plaqueNumber: z.string().min(6, "6 caractères minimum."),
  photo: z
    .instanceof(File, { message: "Choisis une photo." })
    .refine((f) => f.size > 0, "Choisis une photo."),
});

export type VehicleValues = z.infer<typeof vehicleSchema>;
