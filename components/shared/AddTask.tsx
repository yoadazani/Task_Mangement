import React from 'react';
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";

export const AddTask = () => {
    return <Button variant="premium" className="rounded-full md:rounded-lg">
        <Plus className="w-4 h-4"/>
        <span className="hidden md:block ml-2">Add Task</span>
    </Button>
}