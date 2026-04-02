export const AVATAR_ROLE = [
  { role: "USER", tailwindClasses: "bg-[#FFE8D9] text-[#D3590B]" },
  { role: "ADMIN", tailwindClasses: "bg-[#E0ECFF] text-[#3B82F6]" },
  { role: "CONTRIBUTOR", tailwindClasses: "bg-[#E5E7EB] text-[#6B7280]" },
];

export const getAvatarRole = (role: string) => {
  const found = AVATAR_ROLE.find(
    (tailwindClasses) => tailwindClasses.role === role,
  );
  return found ? found.tailwindClasses : "";
};

export const USER_ROLE_CONFIG = {
  ADMIN: {
    label: "Propriétaire",
    badgeVariant: "owner",
  },
  USER: {
    label: "Contributeur",
    badgeVariant: "user",
  },
  CONTRIBUTOR: {
    label: "Contributeur",
    badgeVariant: "muted",
  },
} as const;

export const getRoleInfo = (role: string) => {
  return (
    USER_ROLE_CONFIG[role as keyof typeof USER_ROLE_CONFIG] ||
    USER_ROLE_CONFIG.USER
  );
};
