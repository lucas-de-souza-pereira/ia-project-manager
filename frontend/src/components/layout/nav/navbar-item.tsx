"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function NavbarItem({ href, icon, label }: NavbarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`inline-flex items-center w-auto md:w-62 h-12 md:h-19.5 rounded-lg px-4 md:px-10.5 py-4 md:py-6.75 justify-center gap-4 transition-colors duration-300 ${
        isActive
          ? "bg-primary-button text-primary-foreground cursor-default"
          : "bg-transparent text-primary hover:bg-primary-button hover:text-primary-foreground"
      }`}
      onClick={(e) => isActive && e.preventDefault()}
    >
      {icon}
      <span className="hidden md:block text-base">{label}</span>
    </Link>
  );
}
