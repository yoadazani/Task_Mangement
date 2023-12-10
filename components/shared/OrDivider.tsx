import React from 'react';

export const OrDivider = () => {
    return <div className="flex w-full justify-center items-center space-x-1">
        <div className="border border-dashed border-zinc-400 h-[0.2px] w-full"/>
        <span className="font-mono font-bold text-zinc-500">OR</span>
        <div className="border border-dashed border-zinc-400 h-[0.2px] w-full"/>
    </div>
}