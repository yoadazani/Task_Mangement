import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {IBoardParticipantsStore} from "@/interfaces/pages/boards/IBoardParticipantsStore";
import {fetchParticipants} from "@/services/actions/boardParticipantsActions";
import toast from "react-hot-toast";
import {findUserById} from "@/services/actions/userActions";


export const useBoardParticipants = create<IBoardParticipantsStore, [["zustand/immer", never]]>(immer((set, get) => ({
    participants: [],
    participantsIsLoading: false,

    fetchParticipants: async (BoardId: string, startIndex?: number, endIndex?: number): Promise<any> => {
        try {
            const actualBoardParticipants = await fetchParticipants(BoardId, startIndex, endIndex)

            const participantsPerPage = await Promise.all(
                actualBoardParticipants.map(
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
            return toast.error(error.message)
        } finally {
            set({participantsIsLoading: false})
        }
    },
    addParticipant: async (BoardId: string, userId: string, role: string, managerId: string | undefined): Promise<any>=>  {
        return Promise.resolve(undefined);
    },
    deleteParticipant: async (BoardId: string, userId: string): Promise<any> => {
        return Promise.resolve(undefined);
    },
    changeParticipantRole: async (BoardId: string, userId: string, role: string): Promise<any> => {
        return Promise.resolve(undefined);
    },
})))