import {Card, CardContent, CardDescription} from "@/components/ui/card";
import React from "react";
import {CreateBoard} from "@/components/pages/boards/CreateBoard";

export const CreateBoardCard = () => {
    return <Card className="h-50 bg-zinc-400/10 dark:bg-zinc-800/50 border-0 pt-4">
        <CardContent className="h-full flex flex-col space-y-4 justify-center items-center text-center p-1.5 lg:p-3 xl:p-6">
            <CreateBoard />
            <CardDescription className="text-sm text-zinc-400 dark:text-zinc-300">
                Create a new board for your team
            </CardDescription>
        </CardContent>
    </Card>;
}