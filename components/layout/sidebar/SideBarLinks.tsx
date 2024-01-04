import React from 'react';
import {sideBarData} from "@/data/sideBarData";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {usePathname, useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
export const SideBarLinks = () => {
    const pathname = usePathname()
    const router = useRouter()

    const handleNavigate = (path: string | null) => {
        if (!path) return

        router.push(path)
    }

    return   <div className="border-b border-zinc-200 dark:border-zinc-700 py-3">
        {
            sideBarData.map((link) => {
                return <div key={link.label}>
                    {
                        !link.subLinks
                            ? (
                                <div
                                    key={link.label}
                                    onClick={() => handleNavigate(link.path)}
                                    className={cn([
                                        "flex items-center gap-x-2 py-1 hover:bg-zinc-200 hover:border-r-2 border-blue-300 dark:hover:bg-zinc-700 cursor-pointer pl-4",
                                        pathname === link.path && "border-r-2 border-blue-300 bg-zinc-200 dark:bg-zinc-700",
                                    ])}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <link.icon className="w-5 h-5"/>
                                    </div>
                                    <span className="text-sm font-medium">{link.value}</span>
                                </div>

                            ) : link.subLinks && (
                            <Accordion type="single" collapsible>
                                <AccordionItem value="settings" className="border-0">
                                    <AccordionTrigger
                                        className={cn([
                                            "flex items-center gap-x-2 py-1 hover:bg-zinc-200 hover:border-r-2 border-blue-300 dark:hover:bg-zinc-700 cursor-pointer px-4 outline-none",
                                            pathname === link.path && "border-r-2 border-blue-300 bg-zinc-200 dark:bg-zinc-700",
                                        ])}
                                    >
                                        <div className="flex flex-row items-center space-x-2">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center">
                                                <link.icon className="w-5 h-5"/>
                                            </div>
                                            <span className="text-sm font-medium">{link.value}</span>
                                        </div>
                                    </AccordionTrigger>

                                    {/*sub links items*/}

                                    {link.subLinks?.map((subLink) => {
                                        return <AccordionContent
                                            key={subLink.label}
                                            onClick={() => router.push(subLink.path!)}
                                            className={
                                                cn([
                                                    "flex items-center gap-x-2 py-1 hover:bg-zinc-200 hover:border-r-2 border-blue-300 dark:hover:bg-zinc-700 cursor-pointer px-6",
                                                    pathname === link.path && "border-r-2 border-blue-300 bg-zinc-200 dark:bg-zinc-700",
                                                ])
                                            }
                                        >
                                            <div className="flex flex-row items-center space-x-2 py-0.5">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center">
                                                    <subLink.icon className="w-5 h-5"/>
                                                </div>
                                                <span className="text-sm font-medium">{subLink.value}</span>
                                            </div>
                                        </AccordionContent>
                                    })}

                                </AccordionItem>
                            </Accordion>
                        )
                    }
                </div>
            })
        }
    </div>
}