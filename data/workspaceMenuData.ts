import {Rename} from "@/components/shared/Rename";
import {Delete, Edit, Settings} from "lucide-react";
import {SettingsNavigatorBtn} from "@/components/shared/SettingsNavigatorBtn";
import {DeleteWorkspace} from "@/components/pages/workspace/DeleteWorkspace";

export const workspaceMenuLookup = {
    rename: {
        label: "Rename",
        component: Rename,
        icon: Edit,
    },
    settings: {
        label: "Settings",
        component: SettingsNavigatorBtn,
        icon: Settings,
    },
    delete: {
        label: "Delete",
        component: DeleteWorkspace,
        icon: Delete,
    },
}
