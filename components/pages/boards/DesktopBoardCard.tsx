import {Card, CardContent, CardDescription} from "@/components/ui/card";
import React from "react";
import {CreateBoard} from "@/components/pages/boards/CreateBoard";

export const DesktopBoardCard = () => {
    return <Card className="hidden md:block max-h-60 bg-zinc-400/10 dark:bg-zinc-800/50 border-0 p-4">
        <CardContent className="h-full flex flex-col justify-center items-center text-center p-1.5 lg:p-3 xl:p-6">
            <CreateBoard />
            <CardDescription className="text-sm text-zinc-400 dark:text-zinc-300">
                Still not enough? Click on the title to create a new board
            </CardDescription>
        </CardContent>
    </Card>;
}