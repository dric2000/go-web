"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendContactMessage } from "@/app/actions";

const schema = z.object({
  message: z
    .string()
    .min(5, "Ton message est un peu court.")
    .max(500, "Message trop long."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    const result = await sendContactMessage(values.message);
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ton message..."
          aria-label="Ton message"
          {...register("message")}
        />
        <Button type="submit" disabled={isSubmitting} className="shrink-0">
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Send />
          )}
          Envoyer
        </Button>
      </div>
      {errors.message && (
        <p className="mt-2 text-xs text-destructive">
          {errors.message.message}
        </p>
      )}
      {status === "success" && (
        <p className="mt-2 text-xs text-brand">
          Message envoyé, merci !
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">
          Une erreur est survenue, réessaie.
        </p>
      )}
    </form>
  );
}
