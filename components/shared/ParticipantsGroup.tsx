import React from 'react';
import {getUserFallback} from "@/utiles/getUserFallback";
import UserAvatar from "@/components/layout/UserAvatar";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";

export const ParticipantsGroup = ({participants}: {
    participants: any[]
}) => {
    return <div className="flex items-center -space-x-2 overflow-hidden justify-end">
        {
            participants?.slice(0, 5).map((user, index) => {
                return <UserAvatar
                    key={index}
                    img={user.user.image}
                    fb={getUserFallback(user.user.name)}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900"
                />
            })
        }
        {
            participants?.length! > 5 &&
            <Button
                variant="ghost"
                size="xs"
                className="h-8 w-8 rounded-full ring-1 ring-white bg-zinc-200 dark:ring-zinc-900 z-[1]"
            >
                <div className="flex items-center w-[inherit] h-[inherit] text-center font-bold text-zinc-900 pr-1">
                    <Plus className="h-3 w-3"/>
                    <span className="text-xs">{participants?.length! - 5}</span>
                </div>
            </Button>
        }
    </div>

}