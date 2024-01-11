import React, {FC} from 'react';
import {OtpInput} from './OtpInput';
import {OtpVerificationProps} from "../../../../brain/types/pages/auth/resetPassword/OtpVerificationProps";



export const OtpVerification: FC<OtpVerificationProps> = ({ userEmail}) => {

    return (
        <div className="flex flex-col space-y-4 text-center">
            <div>
                <span className="font-semibold">Please Enter the OTP to verify your account</span>
                <p className="text-zinc-400 text-sm">OTP has been sent to your email</p>
            </div>
            <OtpInput userEmail={userEmail}/>
        </div>
    )
}