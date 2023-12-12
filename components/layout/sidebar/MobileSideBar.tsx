import React from 'react';
import {SideBar} from "@/components/layout/sidebar/SideBar";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

const SIDE_BAR_POSITION = "left"
export const MobileSideBar = () => {
    return <Sheet>
        <SheetTrigger asChild>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 cursor-pointer m-3 md:hidden">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>
        </SheetTrigger>
        <SheetContent side={SIDE_BAR_POSITION} className="p-0 w-72">
            <SideBar/>
        </SheetContent>
    </Sheet>
}