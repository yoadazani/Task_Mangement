import React from 'react';
import {Button} from "@/components/ui/button";
import {useQueryString} from "@/hooks/useQueryString";
import {Edit} from "lucide-react";

export const Rename = ({target, id, className}: {target: string, id: string, className?: string }) => {
    const {createQueryString} = useQueryString()

    const handleRename = () => {
        return createQueryString(`rename-${target}`, id)
    }

    return <Button
        variant="ghost"
        size="sm"
        className={className}
        onClick={handleRename}
    >
        <Edit className="h-4 w-4"/>
        <span className="ml-2">Rename</span>
    </Button>
}