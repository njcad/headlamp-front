export type UserMessagePayload = {
    user_id?: string;
    message: string;
    clickedOrgIds?: number[];
}

export type AgentMessageResponse = {
    user_id: string;
    message: string;
    orgs?: OrgType[];
}

export type OrgType = {
    id: number;
    name: string;
    description: string;
}
