import React from 'react';
import {getUserFallback} from "@/utiles/getUserFallback";
import UserAvatar from "@/components/layout/UserAvatar";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export const ParticipantsGroup = ({participants, avatarWidth, avatarHeight, maxAvatars}: {
    participants: any[],
    avatarWidth?: string
    avatarHeight?: string,
    maxAvatars: number
}) => {
    const slicedParticipants = participants?.slice(0, maxAvatars);

    return <div className="flex items-center -space-x-2 overflow-hidden justify-end">
        {
            slicedParticipants.map((user, index) => {
                return <UserAvatar
                    key={index}
                    img={user.user.image}
                    fb={getUserFallback(user.user.name)}
                    className={cn("inline-block rounded-full ring-2 ring-white dark:ring-zinc-900 h-8 w-8", avatarWidth, avatarHeight)}
                />
            })
        }
        {
            participants?.length! > maxAvatars &&
            <Button
                variant="ghost"
                size="xs"
                className="h-8 w-8 rounded-full ring-1 ring-white bg-zinc-200 dark:ring-zinc-900 z-[1]"
            >
                <div className="flex items-center w-[inherit] h-[inherit] text-center font-bold text-zinc-900 pr-1">
                    <Plus className="h-3 w-3"/>
                    <span className="text-xs">{participants?.length! - maxAvatars}</span>
                </div>
            </Button>
        }
    </div>

}