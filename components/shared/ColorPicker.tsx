"use client"

import {colors} from "@/data/colors";
import {cn} from "@/lib/utils";
import React from "react";
import {ControllerRenderProps} from "react-hook-form";
import {workspaceSettingsFormSchema} from "@/constant/pages/workspaces/settings/workspaceSettingsFormConstant";
import {z} from "zod";

export const ColorPicker = ({field, defaultColor}: {
    field: ControllerRenderProps<z.infer<typeof workspaceSettingsFormSchema>, "color">, defaultColor?: string
}) => {
    const [selectedColor, setSelectedColor] = React.useState(defaultColor ?? colors[0].split("-")[1])

    return <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4 p-4">
        {colors.map((color: string) => (
            <div
                key={color}
                onClick={() => {
                    let currColor = color.split("-")[1]
                    field.onChange(currColor)
                    setSelectedColor(currColor)
                }}
                className={cn("h-8 w-8 rounded-lg", color, {
                    "ring-2 ring-zinc-500 dark:ring-zinc-100": selectedColor === color.split("-")[1],
                })}
            />
        ))}
    </div>
}