// icons
import { Logo } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full bg-white flex justify-between items-center pl-7.5 pr-13.5 py-5.5 shrink-0">
      <Logo className="w-25 h-3 text-primary-button" />
      <p className="text-foreground text-base">Abricot 2025</p>
    </footer>
  );
}
