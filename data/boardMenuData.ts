import {Rename} from "@/components/shared/Rename";
import {Delete, Edit, Move, Settings} from "lucide-react";

export const boardMenuLookup = {
    rename: {
        label: "Rename",
        icon: Edit,
    },
    delete: {
        label: "Delete",
        icon: Delete,
    },
    settings: {
        label: "Settings",
        icon: Settings
    },
    moveTo: {
        label: "Move to",
        icon: Move,
    }
}
