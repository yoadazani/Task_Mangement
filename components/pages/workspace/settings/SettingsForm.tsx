"use client";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {cn} from "@/lib/utils";
import {ColorPicker} from "@/components/shared/ColorPicker";
import {Button} from "@/components/ui/button";
import React from "react";
import {useForm} from "react-hook-form";
import {useWorkspaces} from "@/stores/workspaces";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {workspaceSettingsFormSchema} from "@/constant/pages/workspaces/settings/workspaceSettingsFormConstant";


import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useWorkspaceParticipants} from "@/stores/workspace_participants";

export const SettingsForm = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const workspaceStore = useWorkspaces();
    const workspaceParticipantsStore = useWorkspaceParticipants();

    const form = useForm<z.infer<typeof workspaceSettingsFormSchema>>({
        resolver: zodResolver(workspaceSettingsFormSchema),
        defaultValues: {
            name: "",
            description: "",
            color: ""
        }
    })

    const handleSubmit = async (data: z.infer<typeof workspaceSettingsFormSchema>) => {
        console.log(data)
        const newWorkspaceData = {
            name: data.name || workspaceStore.workspace?.name,
            description: data.description || workspaceStore.workspace?.description,
            color: data.color || workspaceStore.workspace?.color
        }
        try {
            const response = await workspaceStore.updateWorkspace(workspaceStore.workspace.id, newWorkspaceData)
            toast.success(`Workspace " ${response.name} " updated successfully`)
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const handleDeleteWorkspace = async (workspaceId: string) => {
        try {
            const response = await workspaceStore.deleteWorkspace(workspaceId)
            toast.success(`Workspace " ${response.name} " deleted successfully`)
            return router.push("/home");
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const handleLeaveWorkspace = async (workspaceId: string, userId: string) => {
        try {
            const response = await workspaceParticipantsStore.deleteParticipant(workspaceId, userId)

            toast.success(`You left the workspace ${workspaceId} successfully`)

            if (!response?.participants) {
                toast.success(`Workspace ${workspaceId} deleted because it has no more participants`)
                return router.push('/home')
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    if (!session) return null

    return <Form {...form}>
            <form
                className="flex flex-col gap-y-4 w-full max-w-xl p-4 md:px-8"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <Label className="text-sm text-gray-500 font-medium pl-2">
                                Workspace Name
                            </Label>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                    <Input
                                        type="text"
                                        placeholder={workspaceStore.workspace.name}
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <Label className="text-sm text-gray-500 font-medium pl-2">
                                Workspace Description
                            </Label>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                    <Textarea
                                        rows={4}
                                        placeholder={workspaceStore.workspace.description}
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="color"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="settings" className="border-0">
                                        <AccordionTrigger>
                                            <div className="flex flex-row items-center space-x-2">
                                                <div className={cn("w-8 h-8 rounded-lg", `bg-${workspaceStore.workspace.color}-200`)}/>
                                                <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium"> Select different color </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ColorPicker field={field} defaultColor={workspaceStore.workspace.color}/>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    size="sm"
                    type="submit"
                    className="self-end"
                    variant="premium"
                    disabled={!form.formState.isValid}
                >
                    Save Changes
                </Button>

                <div className="w-full flex justify-start gap-x-2 mt-4">
                    <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteWorkspace(workspaceStore.workspace.id)}
                    >
                        Delete Workspace
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="text-red-500 border border-red-500"
                        onClick={() => handleLeaveWorkspace(workspaceStore.workspace.id, session?.user?.id)}
                    >
                        Leave Workspace
                    </Button>
                </div>
            </form>
    </Form>
}