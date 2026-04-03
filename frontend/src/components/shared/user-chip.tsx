import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserInitials } from "@/lib/utils";
import { User } from "@/types/user";
import { getAvatarRole, getRoleInfo } from "@/config/user-role";

interface UserChipProps {
  user: User;
  currentUserId?: string;
  ownerId?: string;
  variant?: "role" | "name";
}
export function UserChip({
  user,
  currentUserId,
  ownerId,
  variant = "role",
}: UserChipProps) {
  const isMe = user.id === currentUserId;
  const isOwner = user.id === ownerId;

  const actualRole = isOwner ? "ADMIN" : "CONTRIBUTOR";
  const roleInfo = getRoleInfo(actualRole);

  const colorVariant = isMe ? "user" : roleInfo.badgeVariant;
  const avatarRole = isMe ? "USER" : actualRole;

  const label = variant === "role" ? roleInfo.label : user.name;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-8">
        <AvatarFallback className={getAvatarRole(avatarRole)}>
          {getUserInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <Badge variant={colorVariant}>{label}</Badge>
    </div>
  );
}
