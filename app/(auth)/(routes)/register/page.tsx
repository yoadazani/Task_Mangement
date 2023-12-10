"use client"

import React from 'react';

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";


import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {registerSchema} from "@/constant/pages/register/registerConstant";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Register = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSignUp = async (data: z.infer<typeof registerSchema>) => {
        try {
            await axios.post("/api/register", data)

            toast.success("Account created successfully")
            router.push("/login")

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
            onSubmit={form.handleSubmit(onSignUp)}
        >
            <div className="flex justify-center p-4">
                <h1 className="text-2xl font-bold">
                    Create an account
                </h1>
            </div>
            <FormField
                name="name"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                <Input
                                    type="name"
                                    placeholder="Enter your name"
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
            <Link href={"/login"} className="flex items-center">
                <p className="text-sm text-zinc-500">
                    Already have an account?
                </p>
                <Button
                    type="button"
                    variant="link"
                    className="text-blue-700"
                >
                    Login
                </Button>
            </Link>
            <Button
                type="submit"
                className="w-full"
                variant="premium"
            >
                Sign Up
            </Button>
        </form>
    </Form>
}

export default Register;