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

export const CreateBoard = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                className="flex items-center space-x-1.5 border border-zinc-300 dark:border-zinc-600 rounded-lg font-bold px-4 py-2 w-36"
            >
                <Plus className="h-4 w-4 text-zinc-500 font-bold"/>
                <h3 className="text-sm text-zinc-500 dark:text-zinc-300 w-full">
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