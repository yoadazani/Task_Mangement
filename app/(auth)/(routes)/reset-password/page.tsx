"use client"

import {useState} from "react";
import Link from "next/link";

import {OtpVerification} from "@/components/pages/resetPassword/OtpVerification";
import {VerifyEmail} from "@/components/pages/resetPassword/VerifyEmail";
import {ResetPassForm} from "@/components/pages/resetPassword/ResetPassForm";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";


import {useQueryString} from "@/hooks/useQueryString";

const ResetPassword = () => {
    const {getQueryString, searchParams} = useQueryString()

    const isVerified = getQueryString("isVerified") === "1"
    const confirmed = getQueryString("emailConfirmed") === "1"

    const [userEmail, setUserEmail] = useState(getQueryString("email") || "")

    return (
        <Card className="max-w-xl w-full p-4">
            <CardContent>
                {!confirmed && <VerifyEmail setUserEmail={setUserEmail}/>}
                {confirmed && !isVerified && <OtpVerification userEmail={userEmail}/>}

                {isVerified && <ResetPassForm/>}
            </CardContent>
            <CardFooter>
                <Link href={"/login"}>
                    <Button variant="outline" className="w-full">
                        Cancel
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ResetPassword