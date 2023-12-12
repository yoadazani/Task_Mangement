import React from 'react';
import {Plus} from "lucide-react";

export const WorkSpacesList = () => {
    return <div className="py-3">
        <div className="flex items-center justify-between px-4">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">workspaces</p>
            <div className="bg-blue-300 p-0.5 rounded-lg cursor-pointer">
                <Plus className="w-4 h-4 text-zinc-800"/>
            </div>
        </div>
    </div>
}