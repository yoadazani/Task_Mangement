import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {
    addWorkspaceParticipant, AllManagers,
    changeParticipantRole,
    createWorkspace,
    deleteWorkspace,
    deleteWorkspaceParticipant,
    getWorkspace,
    getWorkspaces,
    updateWorkspace
} from "@/services/actions/workspaceActions";
import {findUserById} from "@/services/actions/userActions";
import {IWorkspaceStore} from "@/interfaces/pages/workspaces/IWorkspaceStore";

export const useWorkspaces = create<IWorkspaceStore, [["zustand/immer", never]]>(immer((set, get) => ({
    workspaces: [],
    workspace: {},
    participants: [],
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
            const users = await Promise.all(
                workspace.participants.map(
                    async (participant: any) => {
                        const user = await findUserById(participant.userId)
                        const {role, createdAt, updatedAt} = participant

                        return {
                            user,
                            role,
                            createdAt,
                            updatedAt
                        }
                    }
                )
            )

            set({workspace, participants: users})
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
    },

    addParticipant: async (workspaceID: string, userID: string, role: string, managerId?: string) => {
        set({isLoading: true})
        try {
            const response = await addWorkspaceParticipant(workspaceID, userID, role, managerId)

            const currentWorkspace = await getWorkspace(workspaceID)
            set((state) => {
                if (currentWorkspace) {
                    state.workspace = currentWorkspace
                    state.workspaces = state.workspaces.map((workspace: any) => {
                        if (workspace.id === currentWorkspace.id) {
                            return currentWorkspace
                        }
                        return workspace
                    })
                } else {
                    throw new Error("This workspace does not exist")
                }
            })

            return response
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    },

    deleteParticipant: async (workspaceID: string, userID: string) => {
        set({isLoading: true})
        try {
            const response = await deleteWorkspaceParticipant(workspaceID, userID)

            const currentWorkspace = await getWorkspace(response.workspaceId)
            set((state) => {
                if (currentWorkspace) {
                    state.workspace = currentWorkspace
                    state.workspaces = state.workspaces.map((workspace: any) => {
                        if (workspace.id === currentWorkspace.id) {
                            return currentWorkspace
                        }
                        return workspace
                    })
                } else {
                    state.workspace = {}
                    state.workspaces = state.workspaces.filter((workspace: any) => workspace.id !== workspaceID)
                }
            })

            return currentWorkspace
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }

    },

    changeParticipantRole: async (workspaceID: string, userID: string, role: string) => {
        set({isLoading: true})
        try {
            const response = await changeParticipantRole(workspaceID, userID, role)
            
            set((state) => {
                state.participants.map((participant: any) => {
                    if (participant.user.id === userID) {
                        return response
                    }
                    return participant
                })
            })

            return response
        } catch (error: any) {
            console.log(error)
            throw new Error(error.message)
        } finally {
            set({isLoading: false})
        }
    }

})))
