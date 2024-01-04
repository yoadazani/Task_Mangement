import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {colors} from "@/data/colors";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {useWorkspaces} from "@/stores/workspaces";
import {sleep} from "@/utiles/sleep";
import toast from "react-hot-toast";
import {ColorPicker} from "@/components/shared/ColorPicker";
import {workspaceSettingsFormSchema} from "@/constant/pages/workspaces/settings/workspaceSettingsFormConstant";
import {z} from "zod";

export const CreateWorkspace = () => {
    const router = useRouter()
    const workspaceStore = useWorkspaces()
    const [isOpen, setIsOpen] = React.useState(false)


    const form = useForm<z.infer<typeof workspaceSettingsFormSchema>>({
        defaultValues: {
            name: "",
            description: "",
            color: colors[0].split("-")[1] || "",
        }
    })

    const handleSubmit = async (data: z.infer<typeof workspaceSettingsFormSchema>) => {
        try {
            const response = await workspaceStore.createWorkspace(
                data.name!,
                data.description!,
                data.color!
            )

            toast.success(`workspace " ${response?.name} " created successfully`)
            router.push("/workspace/" + response?.id)
        } catch (error: any) {
            return toast.error(error.message)
        } finally {
            form.reset()
            await sleep(1500)
            setIsOpen(false)
            router.refresh()
        }
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4"/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Create a new workspace </DialogTitle>
                <DialogDescription>
                    Here you can create a new workspace in your organization.
                </DialogDescription>
            </DialogHeader>

            <DialogBody>
                <Form {...form}>
                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Workspace
                                        name</Label>
                                    <FormControl>
                                        <div
                                            className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                            <Input
                                                type="text"
                                                placeholder="Enter workspace name"
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
                                    <Label
                                        className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Description</Label>
                                    <FormControl>
                                        <div
                                            className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                            <Textarea
                                                rows={4}
                                                placeholder="Enter workspace name"
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
                                        <ColorPicker field={field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button
                            variant="premium"
                            type="submit"
                        >
                            Create workspace
                        </Button>
                    </form>
                </Form>
            </DialogBody>
        </DialogContent>
    </Dialog>
}