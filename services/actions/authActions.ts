"use server"

import {findUserByEmail} from "@/services/actions/userActions";
import {
    ErrorResponse,
    SuccessResponse
} from "@/interfaces/pages/resetPassword/IConfirmEmailResponse";

export const confirmEmail = async (email: string) => {
    const user = await findUserByEmail(email)

    if (!user || !user.hashedPassword) {
        return {
            status: "error",
            error: "User not found"
        } as ErrorResponse
    } else {
        return {
            status: "success",
            message: "Email confirmed"
        } as SuccessResponse
    }
}