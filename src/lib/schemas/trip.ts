import { z } from "zod";

export const createTripSchema = z.object({
  vehicleId: z.string().min(1, "Choisis un véhicule."),
  departureCity: z.string().min(1, "La ville de départ est requise."),
  arrivalCity: z.string().min(1, "La ville d'arrivée est requise."),
  pickupPoint: z.string().min(1, "Le point de rendez-vous est requis."),
  departureAt: z
    .string()
    .min(1, "La date de départ est requise.")
    .refine((val) => new Date(val) > new Date(), {
      message: "La date de départ doit être dans le futur.",
    }),
  seatsTotal: z.coerce
    .number()
    .int()
    .min(1, "Au moins 1 place."),
  pricePerSeat: z.coerce
    .number()
    .int()
    .min(1, "Le prix doit être supérieur à 0."),
});

export type CreateTripValues = z.infer<typeof createTripSchema>;
export type CreateTripInput = z.input<typeof createTripSchema>;
