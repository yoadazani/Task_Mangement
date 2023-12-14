"use client"

import {useQuery} from "@tanstack/react-query";
import {getWorkspaces} from "@/services/actions/workspaceActions";

export const useWorkspaces = () => {

    const {
        data: userWorkspaces,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['userWorkspaces'],
        queryFn: async () =>  {
            return getWorkspaces()
        }
    })


    return {
        userWorkspaces,
        isLoading,
        isError,
        error
    }
}



