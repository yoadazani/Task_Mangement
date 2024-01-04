import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const UserAvatar = ({img, fb, className}: {
    img?: string,
    fb: string,
    className?: string
}) => {
    return <Avatar className={className}>
        <AvatarImage
            src={img}
            alt="Avatar"
        />
        <AvatarFallback>{ fb }</AvatarFallback>
    </Avatar>
}
export default UserAvatar;