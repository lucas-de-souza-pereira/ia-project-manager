"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function SidebarItem({ href, icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`inline-flex items-center w-62 h-19.5 rounded-md px-15.5 py-6.75 justify-start gap-4 transition-colors duration-300 ${
        isActive
          ? "bg-sidebar text-sidebar-foreground cursor-default"
          : "bg-transparent text-sidebar-primary hover:bg-sidebar hover:text-sidebar-foreground"
      }`}
      onClick={(e) => isActive && e.preventDefault()}
    >
      {icon}
      <span className="text-base">{label}</span>
    </Link>
  );
}
