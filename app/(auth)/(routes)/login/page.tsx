"use client"

import React from 'react';
import Link from "next/link";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";


import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {loginSchema} from "@/constant/pages/login/loginConstant";
import {OrDivider} from "@/components/shared/OrDivider";
import {OAuthSignIn} from "@/components/pages/login/OAuthSignIn";

const Login = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSignIn = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response = await signIn("credentials", {
                ...data,
                redirect: false
            })

            if (!response?.ok) {
                return toast.error(response?.error as string)
            }

            toast.success("Logged in successfully")
            router.push("/home")

        } catch (error: any) {
            const {response} = error
            return toast.error(response?.data)

        } finally {
            form.reset()
        }
    }
    return <Form {...form}>
        <form
            className="rounded-lg border w-full max-w-xl p-4 px-3 md:px-6 drop-shadow-md space-y-4 bg-white"
            onSubmit={form.handleSubmit(onSignIn)}
        >
            <div className="flex justify-center p-4">
                <h1 className="text-2xl font-bold">
                    Sign In to your account
                </h1>
            </div>

            <FormField
                name="email"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                <Input
                                    type="email"
                                    placeholder="example@ex.com"
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
                name="password"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                <Input
                                    type="password"
                                    placeholder="Choose a password"
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Link href={"/reset-password"} className="flex items-center">
                <p className="text-sm text-zinc-500">
                    Forgot your password?
                </p>
                <Button
                    type="button"
                    variant="link"
                    className="text-blue-700"
                >
                    Reset
                </Button>
            </Link>

            <OrDivider />

            <OAuthSignIn />

            <Button
                type="submit"
                className="w-full"
                variant="premium"
            >
                Sign In
            </Button>
        </form>
    </Form>
}

export default Login;

