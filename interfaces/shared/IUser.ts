export interface IUser {
    id?: string;
    name: string;
    email: string;
    hashedPassword: string;
    image?: string;
}