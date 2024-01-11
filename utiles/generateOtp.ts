export const generateOtp = () => {
    const otpLength: number = 6;

    let Otp: string = ""

    for (let i = 0; i < otpLength; i++) {
        Otp += Math.floor(Math.random() * 10)
    }

    return Otp
};