/**
 * API for agent chat.
 * 
 * Contains post request to send to backend and get response.
 */
import { postJson } from "./baseAPI";
import {
  AgentMessageResponse,
  UserMessagePayload,
} from "../types/chatTypes";

export const sendChatMessage = async (
  payload: UserMessagePayload,
): Promise<AgentMessageResponse> => {
  return postJson<AgentMessageResponse>("/chat", payload);
};
