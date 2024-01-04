import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import {getUserFallback} from "@/utiles/getUserFallback";
import UserAvatar from "@/components/layout/UserAvatar";
import {useSession} from "next-auth/react";
import {Badge} from "@/components/ui/badge";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

export const Participants = ({participants}: { participants: any[] }) => {
    const { data: session } = useSession();

    return <Dialog>
        <DialogTrigger>
            <span className="font-semibold text-zinc-400 dark:text-zinc-500">participants</span>
        </DialogTrigger>
        <DialogContent className="max-h-[500px]">
            <DialogHeader>
                <DialogTitle className="border-b border-zinc-300 dark:border-zinc-700 pb-2">
                    Workspace Members
                </DialogTitle>
            </DialogHeader>
            <DialogBody>
                <div className="space-y-4">
                    {participants.map((participant, index) => {
                        return <div key={index} className="flex items-center justify-between px-2">
                            <div className="flex items-center space-x-4 w-[45%]">
                                <UserAvatar className="h-8 w-8" img={participant.user.image} fb={getUserFallback(participant.user.name)}/>
                                <span className="text-zinc-500 dark:text-zinc-200 text-sm">{participant.user.name}</span>
                            </div>

                            <div className="text-sm text-zinc-500 dark:text-zinc-200 w-[35%]">
                            <span>
                                {new Date(participant.user.createdAt).toLocaleDateString()}
                            </span>
                            </div>

                            <div className="flex items-center justify-center w-[15%]">
                                {participant?.role === 'admin' && <Badge variant="premium" className="rounded-full">Admin</Badge>}
                                {participant.user.id === session?.user?.id && <Badge variant="premium" className="rounded-full">You</Badge>}
                            </div>
                        </div>
                    })}
                </div>
            </DialogBody>
        </DialogContent>
    </Dialog>
}