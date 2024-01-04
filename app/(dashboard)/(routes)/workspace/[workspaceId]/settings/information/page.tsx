"use client";

import {useWorkspaces} from "@/stores/workspaces";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";
import {SettingsForm} from "@/components/pages/workspace/settings/SettingsForm";
import {Heading} from "@/components/shared/Heading";
import Description from "@/components/shared/Description";
import {ScrollArea} from "@/components/ui/scroll-area";

const EditWorkspace = () => {
    const params = useParams();
    const workspaceStore = useWorkspaces();

    useEffect(() => {
        (async () => {
            if (params.workspaceId) {
                await workspaceStore.fetchSingleWorkspace(params.workspaceId as string);
            }
        })()
    }, [params.workspaceId]);

    return <ScrollArea className="h-[calc(100vh-14rem)] md:h-[calc(100vh-4.8rem)] w-full m-auto pb-4">
        <div className="p-4 md:px-8 mb-2 bg-white dark:bg-zinc-800 sticky top-0 w-12/12">
            <Heading> Manage Workspace </Heading>
            <Description> Manage workspace information and settings here. </Description>
        </div>
        <SettingsForm/>
    </ScrollArea>
}

export default EditWorkspace;