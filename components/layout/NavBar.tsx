import React from 'react';
import {UserMenu} from "@/components/layout/UserMenu";
import {MobileSideBar} from "@/components/layout/sidebar/MobileSideBar";
import {SearchBar} from "@/components/layout/SearchBar";

export const NavBar = () => {
    return (
        <div
            className="flex justify-between md:justify-end items-center p-1 px-2 border-b border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 shadow-md">
            <MobileSideBar/>
            <div className="hidden md:block">
                <SearchBar/>
            </div>
            <UserMenu/>
        </div>
    )
}