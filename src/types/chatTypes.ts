export type UserMessagePayload = {
    user_id?: string;
    message: string;
    clickedOrgIds?: number[];
    do_apply?: boolean;
}

export type AgentMessageResponse = {
    user_id: string;
    message: string;
    orgs?: OrgType[];
    application_draft?: ApplicationDraft;
}

export type OrgType = {
    id: number;
    name: string;
    description: string;
}

export type ApplicationDraft = {
    name: string;
    phone: string;
    summary: string;
    orgs: OrgType[];
}
