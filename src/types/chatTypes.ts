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
    applicationDraft?: BackendApplicationDraft;
}

export type OrgType = {
    id: number;
    name: string;
    description: string;
}

// Backend shape (matches Python ApplicationDraft)
export type BackendApplicationDraft = {
    name: string;
    phone?: string;
    email?: string;
    summary: string;
    organizations: OrgType[];
}

export type ApplicationDraft = {
    name: string;
    phone: string;
    summary: string;
    orgs: OrgType[];
}
