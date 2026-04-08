import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TaskFormModal from "./tasks-form-modal";
import { User } from "@/types/user";

export function CreateTaskModal({ projectMember = [] }: { projectMember?: User[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("modal") === "create-task";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer une tâche</DialogTitle>
          <DialogDescription className="sr-only">
            Formulaire pour créer une nouvelle tâche dans le projet
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <TaskFormModal projectMember={projectMember} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
