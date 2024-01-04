"use client";

import {useParams} from "next/navigation";
import {Heading} from "@/components/shared/Heading";
import Description from "@/components/shared/Description";
import {ParticipantsGroup} from "@/components/shared/ParticipantsGroup";
import {useWorkspaces} from "@/stores/workspaces";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {WorkSpaceMenu} from "@/components/pages/workspace/WorkSpaceMenu";
import {useQueryString} from "@/hooks/useQueryString";
import {Input} from "@/components/ui/input";
import {FolderEdit, Info} from "lucide-react";
import {Participants} from "@/components/shared/Participants";

const SpecificWorkspace = () => {
    const params = useParams();
    const workspaceStore = useWorkspaces();
    const {getQueryString, deleteQueryString} = useQueryString();
    const [newWorkspaceName, setNewWorkspaceName] = useState<string>();

    const renameOn = getQueryString("rename");

    const rename = async (name: string) => {
        if (!name || name.trim() === "") {
            toast("Workspace name cannot be empty", {
                icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400"/>,
            });
            deleteQueryString("rename");
            return;
        }
        try {
            await workspaceStore.updateWorkspace(params.workspaceId as string, {name});
            toast.success("Workspace renamed successfully");
        } catch (error) {
            toast.error("Failed to rename workspace");
        } finally {
            deleteQueryString("rename");
        }
    }

    useEffect(() => {
        (async () => {
            if (params.workspaceId) {
                await workspaceStore.fetchSingleWorkspace(params.workspaceId as string);
            } else {
                toast.error("Workspace not found");
            }
        })()
    }, [workspaceStore.workspace]);

    if (workspaceStore.isLoading) return <div>Loading...</div>


    return <div className="relative w-full h-full p-3">
        <div className="flex items-end justify-between p-4 md:px-8 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <div className="space-y-2">
                {
                    !renameOn
                        ? <Heading>{workspaceStore.workspace.name}</Heading>
                        : <div
                            className="flex items-center px-2 space-x-2 border rounded-lg border-zinc-400 dark:border-zinc-700">
                            <Input
                                autoFocus
                                placeholder={workspaceStore.workspace.name}
                                onChange={(e) => setNewWorkspaceName(e.target.value)}
                                className="border-0 border-zinc-300 dark:border-zinc-700 rounded-lg outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            />
                            <FolderEdit
                                onClick={() => rename(newWorkspaceName!)}
                                className="h-5 w-5 text-violet-500 dark:text-violet-400 cursor-pointer"
                            />
                        </div>
                }
                <Description>{workspaceStore.workspace.description}</Description>
            </div>
            <div className="flex items-center space-x-5">
                <div className="flex items-end space-x-2">
                    <Participants participants={workspaceStore.participants}/>
                    <ParticipantsGroup participants={workspaceStore.participants}/>
                </div>

                <WorkSpaceMenu/>
            </div>
        </div>

        <div className="h-[calc(100vh-10rem)] grid grid-cols-1 space-y-2 md:space-y-0 md:grid-cols-3 md:space-x-2 py-3 md:py-1">
            <div className="col-span-2 border rounded-lg border-zinc-200 dark:border-zinc-700 p-4">
                <div className="h-full">
                    <p className="text-sm font-medium text-zinc-500">Boards</p>
                </div>
            </div>
            <div className="border rounded-lg border-zinc-200 dark:border-zinc-700 p-4">
                <div className="h-full">
                    <p className="text-sm font-medium text-zinc-500">Notifications</p>
                </div>
            </div>
        </div>
    </div>
}
export default SpecificWorkspace;