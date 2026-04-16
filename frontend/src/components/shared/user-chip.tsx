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

  const label =
    variant === "role" ? roleInfo.label : user.name || "Utilisateur";

  const screenReaderLabel = `${user.name || "Utilisateur"} - ${roleInfo.label}`;

  return (
    <div
      className="flex items-center gap-2"
      aria-label={screenReaderLabel}
      role="img"
    >
      <Avatar aria-hidden="true">
        <AvatarFallback
          className={`${getAvatarRole(avatarRole)} text-[10px] border border-card `}
        >
          {getUserInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <Badge variant={colorVariant} aria-hidden="true">
        {label}
      </Badge>
    </div>
  );
}
