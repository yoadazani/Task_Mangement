import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {
    AllManagers,
    createWorkspace,
    deleteWorkspace,
    getWorkspace,
    getWorkspaces,
    updateWorkspace
} from "@/services/actions/workspaceActions";
import {IWorkspaceStore} from "@/interfaces/pages/workspaces/IWorkspaceStore";

export const useWorkspaces = create<IWorkspaceStore, [["zustand/immer", never]]>(immer((set, get) => ({
    workspaces: [],
    workspace: {},
    isLoading: true,

    fetchWorkspaces: async () => {
        try {
            const response = await getWorkspaces()
            set({workspaces: response})
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    },

    fetchSingleWorkspace: async (workspaceID: string) => {
        try {
            const workspace = await getWorkspace(workspaceID)

            if (!workspace) {
                set({workspace: {}})
                return
            }

            set({workspace})
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    },

    createWorkspace: async (name: string, description?: string, color?: string) => {
        set({isLoading: true})
        try {
            const response = await createWorkspace(name, description, color)

            set((state) => {
                state.workspaces.push(response)
                return state
            })

            return response
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    },

    updateWorkspace: async (workspaceID: string, data: any) => {
        set({isLoading: true})
        try {
            const response = await updateWorkspace(workspaceID, data)
            set({workspace: response})

            return response
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    },

    deleteWorkspace: async (workspaceID: string) => {
        set({isLoading: true})
        try {
            const response = await deleteWorkspace(workspaceID)
            set((state) => {
                state.workspaces = state.workspaces.filter((workspace: any) => workspace.id !== workspaceID)
                return state
            })

            return response
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    }

})))
