"use client"

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useWorkspaces} from "@/hooks/useWorkspace";
import {Skeleton} from "@/components/ui/skeleton";
import {CreateWorkspace} from "@/components/shared/CreateWorkspace";
import {MoreHorizontal} from "lucide-react";
import {cn} from "@/lib/utils";

export const WorkSpacesList = () => {

    const {userWorkspaces, isLoading, isError, error} = useWorkspaces()
    if (isError) console.log(error)
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
                    {isLoading &&
                        <div className="space-y-2">
                            <Skeleton className="h-2 w-[80%] m-auto"/>
                            <Skeleton className="h-2 w-[80%] m-auto"/>
                        </div>
                    }
                    {userWorkspaces?.map((workspace: any) => {
                        const {color} = workspace
                        return <div key={workspace.id}
                             className="flex items-center justify-between gap-2 w-full p-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md">
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn("h-5 w-5 rounded-md text-center text-xs p-0.5", `bg-${color}-200`)}>
                                    <span>{workspace.name[0].toLowerCase()}</span>
                                </div>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{workspace.name.toLowerCase()}</p>
                            </div>
                            <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400"/>
                        </div>
                    })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
}

