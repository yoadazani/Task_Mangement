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
import {BellRing, FolderEdit, Info} from "lucide-react";
import {Participants} from "@/components/shared/Participants";
import {useWorkspaceParticipants} from "@/stores/workspace_participants";
import {CreateBoardCard} from "@/components/pages/workspace/CreateBoardCard";
import {Boards} from "@/components/pages/boards/Boards";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";

const SpecificWorkspace = () => {
    const params = useParams();
    const workspaceStore = useWorkspaces();
    const workspaceParticipantsStore = useWorkspaceParticipants()
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
            await workspaceParticipantsStore.fetchParticipants(
                params.workspaceId as string
            )
        })()
    }, [workspaceParticipantsStore.participantsIsLoading]);

    useEffect(() => {
        (async () => {
            if (params.workspaceId) {
                await workspaceStore.fetchSingleWorkspace(params.workspaceId as string);
            } else {
                toast.error("Workspace not found");
            }
        })()
    }, [workspaceStore.isLoading]);


    return <div className="relative w-full h-full space-y-2 p-3">
        <div
            className="flex items-end justify-between p-2 md:px-5">
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

            {/* participantsGroup and workspaceOptions */}
            <div className="flex items-center space-x-5">
                <div className="flex items-end space-x-2">
                    <Participants participants={workspaceParticipantsStore.participants}/>
                    <ParticipantsGroup participants={workspaceParticipantsStore.participants}/>
                </div>

                {/* Notifications */}
                <BellRing className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer"/>

                <WorkSpaceMenu/>
            </div>
        </div>

        <ScrollArea className="relative h-[calc(100vh-10rem)] px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 py-2">
                <CreateBoardCard/>
                <Boards/>
            </div>
        </ScrollArea>
    </div>
}
export default SpecificWorkspace;