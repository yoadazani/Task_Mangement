export interface IBoardsStore {
    boards: any
    board: any
    isLoading: boolean
    fetchBoards: (workspaceId: string) => Promise<any>
    swapBoards: (sourceId: string, sourceIndex: number, destinationIndex: number) => Promise<any>
    fetchSingleBoard: (boardId: string) => Promise<any>
    createBoard: (workspaceId: string, name: string, description?: string, color?: string) => Promise<any>
    updateBoard: (boardId: string, data: any) => Promise<any>
    deleteBoard: (boardId: string) => Promise<any>
}