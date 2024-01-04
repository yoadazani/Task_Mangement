"use client"

import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Description from "@/components/shared/Description";
import {Heading} from "@/components/shared/Heading";
import {Button} from "@/components/ui/button";
import {UserPlus} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {InvitationSchema} from "@/constant/pages/workspaces/settings/InvitationConstant";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useParams} from "next/navigation";
import toast from "react-hot-toast";
import {inviteToWorkspace} from "@/services/actions/workspaceActions";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {useState} from "react";


const Invite = () => {
    const params = useParams()
    const [toggle, setToggle] = useState(false)

    const form = useForm<z.infer<typeof InvitationSchema>>({
        resolver: zodResolver(InvitationSchema),
        defaultValues: {
            email: '',
            role: '',
        }
    })
    const handleSubmit = async (data: z.infer<typeof InvitationSchema>) => {
        try {
            const workspaceId = params.workspaceId as string
            const response = await inviteToWorkspace(workspaceId, data.email, data.role)

            if (response.status === 201) {
                return toast.success(response.message)
            } else {
                return toast.error(response.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            form.reset()
            setToggle(false)
        }
    }

    return (
        <Dialog open={toggle} onOpenChange={setToggle}>
            <DialogTrigger className="self-start">
                <Badge variant="premium" className="cursor-pointer py-2 px-4">
                    <UserPlus className="mr-2 w-5 h-5"/>
                    <span className="text-sm">
                        Invite
                    </span>
                </Badge>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="space-y-2">
                        <Heading>Invite a new Member</Heading>
                        <Description>Invite a new member to the workspace.</Description>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col max-w-xl space-y-2 md:p-5"
                    >
                        <FormField
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <div className="space-y-1">
                                        <Label className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                                            Email address
                                        </Label>
                                        <Description>
                                            Enter the email address of the user you want to invite.
                                        </Description>
                                    </div>
                                    <FormControl>
                                        <div
                                            className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                            <Input
                                                type="email"
                                                placeholder="exemple@ex.com"
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
                            name="role"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                            }}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="Role"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        <div className="self-end flex items-center space-x-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-[100px] mt-2"
                                onClick={() => {
                                    setToggle(false)
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="premium"
                                size="sm"
                                className="w-[100px] mt-2"
                            >
                                <UserPlus className="mr-2 w-4 h-4"/>
                                Invite
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default Invite