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
import { updateTaskAction } from "@/lib/actions/tasks";
import { CreateTaskData, Task } from "@/types/task";
import { User } from "@/types/user";

export function UpdateTaskModal({
  tasks = [],
  projectMember = [],
}: {
  tasks?: Task[];
  projectMember?: User[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { id: projectId } = useParams();

  const [error, setError] = useState<string | null>(null);

  const taskId = searchParams.get("taskId");
  const isOpen = searchParams.get("modal") === "update-task";

  const taskToEdit = tasks.find((t) => t.id === taskId);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("modal");
      nextParams.delete("taskId");
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto px-4 md:px-6 lg:px-8 xl:px-18.25 py-4 md:py-8 lg:py-13 xl:py-19.75">
        <DialogHeader>
          <DialogTitle>Modifier</DialogTitle>
          <DialogDescription className="sr-only">
            Formulaire pour modifier une tâche dans le projet
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

          {taskToEdit ? (
            <TaskFormModal
              initialData={taskToEdit}
              projectMember={projectMember}
              onSubmitAction={async (values) => {
                setError(null);
                const res = await updateTaskAction(
                  projectId as string,
                  taskToEdit.id,
                  values as CreateTaskData,
                );

                if (!res.success) {
                  setError(
                    res.error ||
                      "Une erreur est survenue lors de la modification.",
                  );
                  return;
                }
                handleOpenChange(false);
              }}
            />
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              Chargement des données de la tâche...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
