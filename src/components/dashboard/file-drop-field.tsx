"use client";

import { CheckCircle2, Upload } from "lucide-react";

export function FileDropField({
  file,
  onChange,
  label,
  accept,
}: {
  file: File | undefined;
  onChange: (file: File | undefined) => void;
  label: string;
  accept: string;
}) {
  const previewUrl =
    file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 border border-dashed border-primary/40 bg-background p-6 text-center">
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Aperçu"
          className="h-32 w-full object-cover"
        />
      ) : file ? (
        <>
          <CheckCircle2 className="size-6 text-primary" />
          <span className="text-sm text-foreground">{file.name}</span>
        </>
      ) : (
        <>
          <Upload className="size-6 text-primary" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </>
      )}
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0])}
      />
    </label>
  );
}
