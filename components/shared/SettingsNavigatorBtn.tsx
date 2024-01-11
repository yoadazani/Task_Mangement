import React from 'react';
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

export const SettingsNavigatorBtn = ({className}: { className?: string }) => {
    const params = useParams()
    const router = useRouter()

    return <Button
        variant="ghost"
        size="sm"
        className={className}
        onClick={() => {
            return router.push(`/workspace/${params.workspaceId}/settings/information`)
        }}
    >
        <Settings className="h-4 w-4"/>
        <span className="ml-2">Settings</span>
    </Button>
}