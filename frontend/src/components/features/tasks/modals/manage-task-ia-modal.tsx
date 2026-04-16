"use client";
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";

import { cn } from "@/lib/utils";

// components shadcn
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// components
import { IAPromptForm } from "../ia/ia-prompt-form";
import { IATaskCard } from "../ia/ia-task-card";

// icons
import { Loader2, Plus } from "lucide-react";
import { Star } from "@/components/icons";

// hooks
import { useManageTaskIA } from "@/hooks/use-manage-task-ia";

export function ManageTaskIAModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { id: projectId } = useParams();
  const isOpen = searchParams.get("modal") === "task-ia";

  const { state, actions } = useManageTaskIA(projectId as string, () =>
    handleOpenChange(false),
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      actions.reset();
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("modal");
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* <DialogContent className="w-[92vw] sm:max-w-[500px] flex flex-col p-6 sm:p-8 max-h-[90vh] overflow-hidden"> */}
      <DialogContent className="max-w-[300px] sm:max-w-[500px]">
        <DialogHeader className="flex-none mb-4">
          <DialogTitle className="flex items-center gap-x-2 text-2xl font-semibold">
            <span>
              <Star className="w-5.25 h-5.25 text-[#FF8B42]" />
            </span>
            {state.hasTasks ? "Vos tâches..." : "Créer une tâche"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Génération automatique de tâches par IA via Mistral.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col grow min-h-0 overflow-hidden">
          {state.error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
              {state.error}
            </div>
          )}
          {/* LISTE DES TÂCHES GÉNÉRÉES */}
          {state.hasTasks && (
            <div className="grow overflow-y-auto pr-1 mb-4 flex flex-col gap-y-3">
              {state.generatedTasks.map((task, idx) => (
                <IATaskCard
                  key={idx}
                  task={task}
                  isEditing={state.editingIndex === idx}
                  editTitle={state.editTitle}
                  editDesc={state.editDesc}
                  onStartEdit={() => actions.startEditing(idx, task)}
                  onSaveEdit={() => actions.saveEditedTask(idx)}
                  onCancelEdit={actions.cancelEditing}
                  onRemove={() => actions.removeTask(idx)}
                  onUpdateTitle={actions.setEditTitle}
                  onUpdateDesc={actions.setEditDesc}
                />
              ))}

              <div className="mt-4 flex justify-center">
                <Button
                  onClick={actions.handleSaveTasks}
                  disabled={state.isSaving || state.generatedTasks.length === 0}
                  className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-6 text-base font-medium rounded-xl"
                >
                  {state.isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Plus className="w-5 h-5 mr-2" />
                  )}
                  Ajouter les tâches
                </Button>
              </div>
            </div>
          )}
          {/* FORMULAIRE DE SAISIE IA */}
          <IAPromptForm
            prompt={state.prompt}
            setPrompt={actions.setPrompt}
            onSubmit={actions.handleGenerate}
            isLoading={state.isLoading}
            disabled={state.isSaving}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
