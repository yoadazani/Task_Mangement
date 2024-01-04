"use client"
import {useEffect} from "react";
import {useRouter} from "next/navigation";

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Skeleton} from "@/components/ui/skeleton";
import {CreateWorkspace} from "@/components/pages/workspace/CreateWorkspace";

import {useWorkspaces} from "@/stores/workspaces";
import {cn} from "@/lib/utils";

export const WorkSpacesList = () => {

    const router = useRouter()
    const workspaceStore = useWorkspaces()

    useEffect(() => {
        (async () => {
            await workspaceStore.fetchWorkspaces()
        })()
    }, [workspaceStore.isLoading]);

    return <div className="py-3">
        <Accordion type="single" collapsible>
            <AccordionItem value="workspaces" className="border-0">
                <div className="flex items-center justify-between pr-2">
                    <AccordionTrigger className="py-1 px-4 outline-none cursor-pointer space-x-4">
                        <span className="text-zinc-500 dark:text-zinc-400 text-sm ">workspaces</span>
                    </AccordionTrigger>
                    <CreateWorkspace/>
                </div>

                <AccordionContent className="flex flex-col p-2">
                    {workspaceStore.isLoading &&
                        <div className="space-y-2">
                            <Skeleton className="h-2 w-[80%] m-auto"/>
                            <Skeleton className="h-2 w-[80%] m-auto"/>
                        </div>
                    }
                    {workspaceStore.workspaces?.map((workspace: any, index: number) => {
                        return <div
                            key={index}
                            className="flex items-center justify-between gap-2 w-full p-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md"
                            onClick={() => {
                                return router.push(`/workspace/${workspace.id}`)
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn("h-5 w-5 rounded-md text-center text-xs p-0.5", `bg-${workspace.color}-200`)}>
                                    <span>{workspace.name?.[0].toLowerCase()}</span>
                                </div>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{workspace.name?.toLowerCase()}</p>
                            </div>
                        </div>
                    })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
}

