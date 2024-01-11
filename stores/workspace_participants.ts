import {create} from "zustand";
import {findUserById} from "@/services/actions/userActions";
import {immer} from "zustand/middleware/immer";
import {IWorkspaceParticipantsStore} from "@/interfaces/pages/workspaces/IWorkspaceParticipantsStore";
import {
    addParticipant,
    changeParticipantRole,
    deleteParticipant,
    fetchParticipants
} from "@/services/actions/workspaceParticpantsActions";

export const useWorkspaceParticipants = create<IWorkspaceParticipantsStore, [["zustand/immer", never]]>(immer((set, get) => ({
    participants: [],
    participantsIsLoading: true,

    fetchParticipants:
        async (workspaceId: string, startIndex?: number, endIndex?: number) => {
            try {
                const response = await fetchParticipants(workspaceId, startIndex, endIndex)

                const participantsPerPage = await Promise.all(
                    response.map(
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

                set({participants: participantsPerPage})
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                set({participantsIsLoading: false})
            }
        },

    addParticipant:
        async (workspaceID: string, userID: string, role: string, managerId?: string) => {
            set({participantsIsLoading: true})
            try {
                const response = await addParticipant(workspaceID, userID, role, managerId)

                set((state) => {
                    state.participants.push(response)
                })

                return response
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                set({participantsIsLoading: false})
            }
        },

    deleteParticipant:
        async (workspaceID: string, userID: string) => {
            set({participantsIsLoading: true})
            try {
                const response = await deleteParticipant(workspaceID, userID)

                set((state) => {
                    state.participants.filter((participant) => participant.id !== userID)
                })

                return response
            } catch (error: any) {
                throw new Error(error.message)
            } finally {
                set({participantsIsLoading: false})
            }

        },

    changeParticipantRole: async (workspaceID: string, userID: string, role: string) => {
        set({participantsIsLoading: true})
        try {
            const response = await changeParticipantRole(workspaceID, userID, role)

            set((state) => {
                state.participants.map((participant: any) => {
                    if (participant.user.id === userID) {
                        return participant.role = role
                    }
                    return participant
                })
            })

            return response
        } catch (error: any) {
            console.log(error)
            throw new Error(error.message)
        } finally {
            set({participantsIsLoading: false})
        }
    }
})))