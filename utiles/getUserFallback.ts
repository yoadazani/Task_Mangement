export const getUserFallback = (name: string) => {
    const userName = name?.split(" ")
    return userName && userName.length > 1
        ? `${userName?.[0][0]}${userName?.[1][0]}`.toUpperCase()
        : `${userName?.[0][0]}${userName?.[0][1]}`.toUpperCase()
}