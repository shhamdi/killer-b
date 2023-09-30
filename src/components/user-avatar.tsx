import { AvatarProps } from "@radix-ui/react-avatar"
import { User } from "next-auth"

import { Icons } from "./icons"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      <AvatarImage alt="avatar picture" src={user.image!} />
      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
