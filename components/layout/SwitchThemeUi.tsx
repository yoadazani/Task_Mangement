import React from 'react';
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";

export const SwitchThemeUi = () => {
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    }

    return <div className="flex items-center space-x-2 w-full p-5 absolute bottom-0 bg-zinc-100 dark:bg-zinc-700">
        <Switch id="theme-mode" onCheckedChange={toggleTheme}/>
        <Label htmlFor="theme-mode">Theme Mode UI</Label>
    </div>
}