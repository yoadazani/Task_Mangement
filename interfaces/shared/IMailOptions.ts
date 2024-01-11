export interface IMailOptions {
    to: string,
    subject: string,
    text: string,
    temp?: {
        templateName: string,
        data: any
    }
}