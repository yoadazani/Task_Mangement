"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ButtonLoader} from "@/components/shared/ButtonLoader";
import {useQueryString} from "@/hooks/useQueryString";

import {KeyRound} from "lucide-react";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {resetPasswordSchema} from "@/constant/pages/resetPassword/resetPasswordConstant";
import toast from "react-hot-toast";
import {findUserByEmail, updatePassword} from "@/services/actions/userActions";

export const ResetPassForm = () => {
    const router = useRouter()
    const {getQueryString} = useQueryString()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    })

    const handleSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
        const userEmail = getQueryString("email") || ""
        const userInfo = await findUserByEmail(userEmail)

        if (!userInfo) {
            toast.error("User not found")
            return
        }
        try {
            setLoading(true)
            await updatePassword(userInfo.id, values.newPassword)
            toast.success("Password updated successfully")

            router.push("/login")
        } catch (error: any) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
            form.reset()
        }

    }

    return <Form {...form}>
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full p-4 px-2 md:px-6 space-y-3"
        >
            <FormField
                name="newPassword"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 w-full p-2 border rounded-sm focus-within:shadow-md">
                                <KeyRound/>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="new password"
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
                                />
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                name="confirmPassword"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 w-full p-2 border rounded-sm focus-within:shadow-md">
                                <KeyRound/>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="confirm password"
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
                                />
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <Button
                type="submit"
                variant="premium"
                className="min-w-[150px]"
            >
                {loading ? <ButtonLoader/> : "Reset now"}
            </Button>
        </form>
    </Form>
}
