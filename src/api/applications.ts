import { API_BASE_URL } from "./baseAPI";

export type ClientApplication = {
  id: string;
  user_id: string;
  organization_id: number;
  urgent: boolean;
  content: string;
  submitted_at: string;
  opened_at?: string | null;
  accepted_at?: string | null;
  denied_at?: string | null;
};

export const getUserApplications = async (
  userId: string,
): Promise<ClientApplication[]> => {
  const resp = await fetch(`${API_BASE_URL}/applications?user_id=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (resp.status === 404) {
    return [];
  }
  if (!resp.ok) {
    return [];
  }
  return resp.json() as Promise<ClientApplication[]>;
};


