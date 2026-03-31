import { NavbarItem } from "./navbar-item";
import { UserAvatar } from "./user-avatar";
import { DashboardIcon } from "@/components/icons";
import { Folder } from "@/components/icons";
import { Logo } from "@/components/icons";
import { LogoutButton } from "@/components/features/auth/logout-button";

export function Navbar() {
  return (
    <nav className="flex flex-col lg:flex-row justify-between w-full items-center px-4 md:px-25 py-4 md:py-2 gap-y-4 lg:gap-y-0">
      <Logo className="w-36.75 h-4.75 text-primary shrink-0" />

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
          <UserAvatar />
          <LogoutButton />
        </nav>
      </div>
    </nav>
  );
}
