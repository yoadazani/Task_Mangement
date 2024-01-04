import React from 'react';
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import {useWorkspaces} from "@/stores/workspaces";
import {Delete} from "lucide-react";

export const DeleteWorkspace = ({className}: { className?: string }) => {
    const params = useParams();
    const router = useRouter();
    const workspaceStore = useWorkspaces()

    const handleDelete = async () => {
        try {
            const response = await workspaceStore.deleteWorkspace(params.workspaceId as string)
            toast.success(`Workspace " ${response.name} " deleted successfully`)
            return router.push("/home");
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return <Button
        variant="ghost"
        size="sm"
        className={className}
        onClick={handleDelete}
    >
        <Delete className="h-4 w-4"/>
        <span className="ml-2">Delete</span>
    </Button>
}