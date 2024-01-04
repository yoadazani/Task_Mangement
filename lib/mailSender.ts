"use server"

import {createTransport} from "nodemailer"
import * as handlebars from "handlebars";
import * as fs from "fs";
import path from "path";
import {IMailOptions} from "@/interfaces/shared/IMailOptions";


const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
})

export const sendMail = async (options: IMailOptions) => {
    let htmlToSend;

    if (options.temp) {
        const source = fs.readFileSync(options.temp.path, 'utf8');
        const template = handlebars.compile(source);

        const replacements = {...options.temp.data};

        htmlToSend = template(replacements);
    }

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: htmlToSend ?? options.text
        })
    } catch (error) {
        console.log(error)
    }
}