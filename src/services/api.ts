export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

export async function api<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(path, init);

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message ?? "Terjadi kesalahan.",
      response.status
    );
  }

  return data;
}