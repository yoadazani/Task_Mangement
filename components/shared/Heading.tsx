import {ReactNode} from 'react';
import {cn} from "@/lib/utils";

export const Heading = ({children, className}: {children: ReactNode, className?: string}) => {
    return (
        <h1 className={cn("text-3xl font-semibold font-sans", className)}>
            {children}
        </h1>
    )
}