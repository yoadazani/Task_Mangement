export interface IMailOptions {
    to: string,
    subject: string,
    text: string,
    temp?: {
        path: string,
        data: any
    }
}