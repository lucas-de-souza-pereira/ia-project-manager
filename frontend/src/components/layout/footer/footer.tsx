
// icons
import { Logo } from "@/components/icons";


export function Footer() {
    return (
    <footer className="w-full bg-primary-foreground flex justify-between items-center p-5.5">
        <Logo className="w-25 h-3 text-primary-button" />
        <p className="text-foreground text-base">Abricot 2025</p>
    </footer>
    );
}