export interface IWorkspaceStore {
    workspaces: any[]
    workspace: any
    isLoading: boolean
    fetchWorkspaces: () => Promise<void>
    fetchSingleWorkspace: (workspaceID: string) => Promise<void>
    createWorkspace: (name: string, description?: string, color?: string) => Promise<any>
    updateWorkspace: (workspaceID: string, data: any) => Promise<any>
    deleteWorkspace: (workspaceID: string) => Promise<any>
}