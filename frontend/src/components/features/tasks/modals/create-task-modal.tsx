"use client";

import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TaskFormModal from "./tasks-form-modal";
import { User } from "@/types/user";
import { createTaskAction } from "@/lib/actions/tasks";
import { CreateTaskData } from "@/types/task";

export function CreateTaskModal({
  projectMember = [],
}: {
  projectMember?: User[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { id: projectId } = useParams();

  const [error, setError] = useState<string | null>(null);

  const isOpen = searchParams.get("modal") === "create-task";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("modal");
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto px-4 md:px-6 lg:px-8 xl:px-18.25 py-4 md:py-8 lg:py-13 xl:py-19.75">
        <DialogHeader>
          <DialogTitle>Créer une tâche</DialogTitle>
          <DialogDescription className="sr-only">
            Formulaire pour créer une nouvelle tâche dans le projet
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {error && (
            <p
              role="alert"
              className="text-sm border border-destructive text-destructive bg-destructive/10 rounded-md p-3 mb-4 text-center"
            >
              {error}
            </p>
          )}
          <TaskFormModal
            projectMember={projectMember}
            onSubmitAction={async (values) => {
              setError(null);
              const res = await createTaskAction(
                projectId as string,
                values as CreateTaskData,
              );
              if (!res.success) {
                setError(
                  res.error || "Une erreur est survenue lors de la création.",
                );
                return;
              }
              handleOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
