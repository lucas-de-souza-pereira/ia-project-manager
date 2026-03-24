import { NavbarItem } from "./navbar-item";
import { DashboardIcon } from "@/components/icons";
import { Folder } from "@/components/icons";
import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex flex-col lg:flex-row justify-between w-full items-center px-4 md:px-25 py-4 md:py-2 gap-y-4 lg:gap-y-0">
      <Logo className="w-36.75 h-4.75 text-primary shrink-0" />

      {/* Conteneur qui reste toujours à l'horizontale (même sur mobile) */}
      <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-x-4 md:gap-x-8">
        <ul className="flex gap-x-2 md:gap-x-4" aria-label="Menu principal">
          <li>
            <NavbarItem
              href="/dashboard"
              icon={<DashboardIcon className="w-6 h-6 shrink-0" />}
              label="Tableau de bord"
            />
          </li>
          <li>
            <NavbarItem
              href="/projects"
              icon={<Folder className="w-7.25 h-5.5 shrink-0" />}
              label="Projets"
            />
          </li>
        </ul>

        <nav aria-label="Menu utilisateur">
          <Link href="/profile">
            <Avatar className="size-10 md:size-16.25 cursor-pointer">
              <AvatarFallback className="bg-primary-light group-hover/avatar:bg-primary transition-colors duration-400">
                U
              </AvatarFallback>
            </Avatar>
          </Link>
        </nav>
      </div>
    </nav>
  );
}
