"use server"

import {createTransport} from "nodemailer"


const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
})

export const sendMail = async (to: string, subject: string, text: string) => {
    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
            html: text
        })
    } catch (error) {
        console.log(error)
    }
}