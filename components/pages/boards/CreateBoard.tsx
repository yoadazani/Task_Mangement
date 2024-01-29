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
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {CreateBoardForm} from "@/components/pages/boards/CreateBoardForm";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import Image from "next/image";

import createBoardVector from "@/assets/new_board.png";

export const CreateBoard = ({className}: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Image src={createBoardVector} alt="create board vector" width={200} height={200} className="md:w-[150px] md:h-[100px] lg:w-[200px] lg:h-[150px]"/>
            <DialogTrigger className={cn("text-xl font-bold px-4 py-2 text-zinc-600 dark:text-zinc-400", className)}>
                Add new board
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