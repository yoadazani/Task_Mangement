export interface IWorkspaceParticipantsStore {
    participants: any[]
    participantsIsLoading: boolean
    fetchParticipants: (workspaceId: string, startIndex?: number, endIndex?: number) => Promise<any>
    addParticipant: (workspaceID: string, userID: string, role: string, managerId?: string) => Promise<any>
    deleteParticipant: (workspaceID: string, userID: string) => Promise<any>
    changeParticipantRole: (workspaceID: string, userID: string, role: string) => Promise<any>
}