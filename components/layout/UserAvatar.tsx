import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const UserAvatar = ({img, fb}: {
    img?: string,
    fb: string
}) => {
    return <Avatar>
        <AvatarImage
            src={img}
            alt="Avatar"
        />
        <AvatarFallback>{ fb }</AvatarFallback>
    </Avatar>
}
export default UserAvatar;