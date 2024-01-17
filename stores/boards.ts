import {create} from "zustand"
import {immer} from "zustand/middleware/immer"

import {IBoardsStore} from "@/interfaces/pages/boards/IBoardsStore";
import {createBoard, deleteBoard, fetchBoards, updateBoard} from "@/services/actions/boardActions";
import toast from "react-hot-toast";

export const useBoards = create<IBoardsStore, [["zustand/immer", never]]>(immer((set, get) => ({
    boards: [],
    board: {},
    isLoading: true,

    fetchBoards: async (workspaceId: string) => {
        try {
            const boards = await fetchBoards(workspaceId)
            set({boards})
        } catch (error: any) {
            return toast.error(error.message)
        } finally {
            set({isLoading: false})
        }
    },
    fetchSingleBoard: async (boardId: string) => {
        try {
            const board = await fetchBoards(boardId)
            set({board})
        } catch (error: any) {
            return toast.error(error.message)
        } finally {
            set({isLoading: false})
        }
    },
    createBoard: async (workspaceId: string, name: string, description?: string, color?: string) => {
        set({isLoading: true})

        try {
            const newBoard = await createBoard(workspaceId, name, description, color)

            set((state) => {
                state.boards.push(newBoard)
                return state
            })

            return toast.success(`Board ${newBoard.name} created successfully`)

        } catch (error: any) {
            return toast.error(error.message)
        } finally {
            set({isLoading: false})
        }
    },
    updateBoard: async (boardId: string, data: any) => {
        try {
            const updatedBoard = await updateBoard(boardId, data)
            set({board: updatedBoard})

            return toast.success(`Board ${updatedBoard.name} updated successfully`)
        } catch (error: any) {
            return toast.error(error.message)
        }
    },
    deleteBoard: async (boardId: string) => {
        set({isLoading: true})

        try {
            const deletedBoard = await deleteBoard(boardId)

            set((state) => {
                state.boards.filter((board: any) => board.id !== boardId)
                return state
            })

            return toast.success(`Board ${deletedBoard.name} deleted successfully`)
        } catch (error: any) {
            return toast.error(error.message)
        } finally {
            set({isLoading: false})
        }
    },

})))
