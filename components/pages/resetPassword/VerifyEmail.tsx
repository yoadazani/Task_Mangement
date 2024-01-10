import React, {Dispatch, SetStateAction, useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {MailOpen} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ButtonLoader} from "@/components/shared/ButtonLoader";
import {useQueryString} from "@/hooks/useQueryString";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {verifyEmailSchema} from "@/constant/pages/resetPassword/verifyEmailConstant";
import {zodResolver} from "@hookform/resolvers/zod";
import {sleep} from "@/utiles/sleep";
import toast from "react-hot-toast";
import {confirmEmail} from "@/services/actions/authActions";
import {generateOtp} from "@/utiles/generateOtp";
import {signal} from "@preact/signals";
import {sendMail} from "@/lib/mailSender";

export const OTP = signal<string>("")

export const VerifyEmail = ({setUserEmail} : {setUserEmail: Dispatch<SetStateAction<string>>}) => {
    const {createQueryString} = useQueryString()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof verifyEmailSchema>>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleVerify = async (data: z.infer<typeof verifyEmailSchema>) => {
        setLoading(true)
        await sleep(1500)
        const confirmationOTP = await confirmEmail(data.email)
        if (confirmationOTP.status === "error") {
            return toast.error(confirmationOTP.error)
        } else {
            OTP.value = generateOtp()
            setUserEmail(data.email)
            createQueryString("emailConfirmed", "1")

            const mailOptions = {
                to: data.email,
                subject: "Invitation to join workspace",
                text: "",
                temp: {
                    templateName: "confirm_email.hbs",
                    data: {
                        logo: {
                            image: "https://i.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=8113&format=png&auto=webp&s=750d601f5c083ada2e639535f6b0576fbcb2dc31",
                            content: "TaskOrganizer"
                        },
                        otp: OTP.value
                    }
                }
            }

            await sendMail(mailOptions)
        }

        setLoading(false)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerify)} className="flex">
            <FormField
                name="email"
                control={form.control}
                render={({field}) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div
                                className="flex items-center gap-x-2 w-full p-2 border rounded-sm focus-within:shadow-md">
                                <MailOpen/>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
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
                {loading ? <ButtonLoader /> : "Submit"}
            </Button>
        </form>
    </Form>
}

export default VerifyEmail;