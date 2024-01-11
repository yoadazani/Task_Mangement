import React from 'react';
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {FaGithub, FaGoogle} from "react-icons/fa";

export const OAuthSignIn = () => {

    const OAuthLogin = async (provider: string) => {
        try {
            const res = await signIn(provider, {
                callbackUrl: "/home"
            })
            
        } catch (error: any) {
            toast.error(error.response.data)
        }
    }

    return <div className="flex space-x-5 justify-center">
        <FaGithub className="cursor-pointer text-3xl" onClick={() => OAuthLogin("github")}/>
        <FaGoogle className="cursor-pointer text-3xl text-red-400" onClick={() => OAuthLogin("google")}/>
    </div>
}