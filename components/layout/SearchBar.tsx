import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import React from "react";

export const SearchBar = () => {
    return <div className="max-w-xs flex items-center my-2 md:my-0 md:mr-4 border border-zinc-200 dark:border-zinc-700 rounded-full px-1.5">
        <Search className="w-5 h-5"/>
        <Input type="search" placeholder="Search" className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"/>
    </div>
}