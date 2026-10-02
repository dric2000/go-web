const API_URL = process.env.API_URL ?? "http://localhost:8000/api";

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  token?: string | null;
};

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, token }: ApiFetchOptions = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Laravel renvoie soit { message }, soit { message, errors: { champ: [msg] } }
    // pour les erreurs de validation (422).
    throw new ApiError(
      response.status,
      data.message ?? data.messae ?? "Une erreur est survenue.",
      data.errors ?? {},
    );
  }

  return data as T;
}

type ApiFetchMultipartOptions = {
  method?: "POST" | "PUT" | "PATCH";
  formData: FormData;
  token?: string | null;
};

// Pour les endpoints qui attendent un fichier (multipart/form-data) : pas de
// Content-Type manuel, fetch pose lui-même le bon boundary avec un FormData.
export async function apiFetchMultipart<T>(
  path: string,
  { method = "POST", formData, token }: ApiFetchMultipartOptions,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message ?? data.messae ?? "Une erreur est survenue.",
      data.errors ?? {},
    );
  }

  return data as T;
}
