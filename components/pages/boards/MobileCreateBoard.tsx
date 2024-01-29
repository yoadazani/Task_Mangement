import React, {useState} from 'react';
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Plus, X} from "lucide-react";
import {CreateBoardForm} from "@/components/pages/boards/CreateBoardForm";

export const MobileCreateBoard = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-50 text-center md:hidden rounded-full bg-clip text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600 text-white shadow-lg hover:from-indigo-500 hover:to-indigo-700 p-2">
                <Plus className="h-8 w-8 font-bold"/>
            </DrawerTrigger>
            <DrawerContent>
                    <DrawerClose className="flex justify-end px-4">
                        <X className="h-5 w-5"/>
                    </DrawerClose>
                <DrawerHeader>

                    <DrawerTitle>
                        Create New Board
                    </DrawerTitle>
                    <DrawerDescription>
                        Create a new board for your team and start organizing your tasks
                    </DrawerDescription>
                </DrawerHeader>

                <div className="mt-4 p-4">
                    <CreateBoardForm setIsOpen={setIsOpen}/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};