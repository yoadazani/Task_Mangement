"use client"

import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {CreateBoardForm} from "@/components/pages/boards/CreateBoardForm";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";

export const CreateBoard = ({className}: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                className={cn("flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg font-bold px-4 py-2 w-32 text-zinc-500 dark:text-zinc-300", className)}
            >
                <Plus className="h-4 w-4 font-bold"/>
                <h3 className="text-sm w-full">
                    New Board
                </h3>
            </DialogTrigger>

            <DialogContent>
                <ScrollArea className="max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>
                            Create New Board
                        </DialogTitle>
                        <DialogDescription>
                            Create a new board for your team and start organizing your tasks
                        </DialogDescription>
                    </DialogHeader>

                    <DialogBody>
                        <CreateBoardForm setIsOpen={setIsOpen}/>
                    </DialogBody>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};