"use client"

import {Logo} from "@/components/shared/Logo";
import {WorkSpacesList} from "@/components/layout/WorkSpacesList";
import {SwitchThemeUi} from "@/components/layout/SwitchThemeUi";
import {SideBarLinks} from "@/components/layout/sidebar/SideBarLinks";

import logo from '@/assets/TaskifyLogo.png'
import {SearchBar} from "@/components/layout/SearchBar";
import React from "react";
export const SideBar = () => {
    return <div className="flex flex-col h-full relative bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700">
        <div className="pl-4 py-4">
            <Logo logoImage={logo}/>
        </div>

        {/* search bar */}
        <div className="block md:hidden mx-auto">
            <SearchBar/>
        </div>

        {/* sideBarLinks */}
        <SideBarLinks />

        {/* workSpaces */}
        <WorkSpacesList/>

        {/*switch theme*/}

        <SwitchThemeUi />
    </div>
}