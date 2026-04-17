// icons
import { Logo } from "@/components/icons";

export function Footer() {
  return (
    <footer 
      className="w-full bg-white flex justify-between items-center pl-7.5 pr-13.5 py-5.5 shrink-0"
      aria-label="Informations de bas de page"
    >
      <Logo className="w-25 h-3 text-primary-button" aria-hidden="true" />
      <p className="text-foreground text-base">Abricot 2025</p>
    </footer>
  );
}
