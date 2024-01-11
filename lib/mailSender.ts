"use server"

import {createTransport} from "nodemailer"
import * as handlebars from "handlebars";
import * as fs from "fs";
import {IMailOptions} from "@/interfaces/shared/IMailOptions";
import path from "path";


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
        const templatePath = path.join(process.cwd(), "EmailTemplates",  options.temp.templateName).toString();
        const source = fs.readFileSync(templatePath, 'utf8');
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