"use server";

// TODO: brancher un vrai envoi (service email type Resend, ou un endpoint
// go-api dédié) — pour l'instant ça ne fait que simuler une réussite, le
// message n'est pas réellement transmis quelque part.
export async function sendContactMessage(message: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!message.trim()) {
    return { success: false as const, error: "Le message est vide." };
  }

  return { success: true as const };
}
