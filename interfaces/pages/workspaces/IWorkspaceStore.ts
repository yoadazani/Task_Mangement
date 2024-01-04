export interface IWorkspaceStore {
    workspaces: any[]
    workspace: any
    participants: any[]
    isLoading: boolean
    fetchWorkspaces: () => Promise<void>
    fetchSingleWorkspace: (workspaceID: string) => Promise<void>
    createWorkspace: (name: string, description?: string, color?: string) => Promise<any>
    updateWorkspace: (workspaceID: string, data: any) => Promise<any>
    deleteWorkspace: (workspaceID: string) => Promise<any>
    addParticipant: (workspaceID: string, userID: string, role: string, managerId?: string) => Promise<any>
    deleteParticipant: (workspaceID: string, userID: string) => Promise<any>
    changeParticipantRole: (workspaceID: string, userID: string, role: string) => Promise<any>
}