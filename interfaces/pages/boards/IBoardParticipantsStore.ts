export interface IBoardParticipantsStore {
    participants: any[],
    participantsIsLoading: boolean
    fetchParticipants: (BoardId: string, startIndex?: number, endIndex?: number) => Promise<any>
    addParticipant: (BoardId: string, userId: string, role: string, managerId?: string) => Promise<any>
    deleteParticipant: (BoardId: string, userId: string) => Promise<any>
    changeParticipantRole: (BoardId: string, userId: string, role: string) => Promise<any>
}