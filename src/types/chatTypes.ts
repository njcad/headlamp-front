export type UserMessagePayload = {
    message: string;
    clickedOrgIds?: number[];
}

export type AgentMessageResponse = {
    message: string;
    orgs?: OrgType[];
}

export type OrgType = {
    id: number;
    name: string;
    description: string;
}
