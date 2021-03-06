export interface AgentRowData {
    agent_id: string;
    name: string;
    password: string;
    user_id: string;
}

export interface EditAgentApiInfo {
    mobileNo: string;
    oldAgentName: string;
    newAgentName: string;
    newAgentPassword: string;
}

export interface AddAgentApiData {
    mobileNo: string;
    agentName: string;
    agentPassword: string;
}

export interface DeleteAgentApiData {
    mobileNo: string;
    agentName: string;
}

export interface AgentDialogData {
    agentData: AgentRowData;
    dialogMode: string;
}