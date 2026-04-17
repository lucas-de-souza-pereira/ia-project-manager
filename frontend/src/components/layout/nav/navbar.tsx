import { NavbarItem } from "./navbar-item";
import { UserAvatar } from "./user-avatar";
import { DashboardIcon } from "@/components/icons";
import { Folder } from "@/components/icons";
import { Logo } from "@/components/icons";

export function Navbar() {
  return (
    <nav
      className="flex flex-col lg:flex-row justify-between w-full items-center px-4 md:px-25 py-4 md:py-2 gap-y-4 lg:gap-y-0"
      aria-label="Navigation principale"
    >
      <Logo
        className="flex w-36.75 h-4.75 text-primary shrink-0"
        aria-hidden="true"
      />

      <div className="flex w-full md:w-auto items-center justify-between gap-x-4 md:gap-x-8 lg:contents">
        <ul className="flex gap-x-2 md:gap-x-4">
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

        <div
          aria-label="Profil utilisateur"
          className="flex flex-col items-center lg:flex-row lg:gap-x-4"
        >
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}
