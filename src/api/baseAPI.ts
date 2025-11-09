export const API_BASE_URL = "http://localhost:8000/api";

export const postJson = async <T>(path: string, payload: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log(response);

  return response.json() as Promise<T>;
};

export const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json() as Promise<T>;
};
