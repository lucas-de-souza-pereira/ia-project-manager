"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";

export function UserAvatar() {
  const { initials } = useAuth();

  return (
    <div className="flex flex-col items-center gap-y-1">
      <Link href="/profile">
        <Avatar className="size-10 md:size-16.25 cursor-pointer">
          <AvatarFallback className="bg-primary-light hover:bg-primary transition-colors duration-300 font-semibold text-primary hover:text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
