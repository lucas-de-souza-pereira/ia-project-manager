"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "@/components/icons";
import { AIGeneratedTask } from "@/lib/actions/ai-tasks";

interface IATaskCardProps {
  task: AIGeneratedTask;
  isEditing: boolean;
  editTitle: string;
  editDesc: string;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemove: () => void;
  onUpdateTitle: (val: string) => void;
  onUpdateDesc: (val: string) => void;
}

export function IATaskCard({
  task,
  isEditing,
  editTitle,
  editDesc,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
  onUpdateTitle,
  onUpdateDesc,
}: IATaskCardProps) {
  return (
    <div className="border border-border rounded-xl p-5 shadow-sm bg-white">
      {isEditing ? (
        <div className="flex flex-col gap-y-3">
          <Input
            value={editTitle}
            onChange={(e) => onUpdateTitle(e.target.value)}
            className="font-semibold text-lg"
            placeholder="Titre"
          />
          <Input
            value={editDesc}
            onChange={(e) => onUpdateDesc(e.target.value)}
            className="text-sm text-muted-foreground"
            placeholder="Description"
          />
          <div className="flex items-center gap-x-2 mt-2">
            <Button size="sm" onClick={onSaveEdit}>
              Valider
            </Button>
            <Button size="sm" variant="ghost" onClick={onCancelEdit}>
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            {task.title}
          </h3>
          <p className="text-sm text-card-foreground mb-4">
            {task.description}
          </p>
          <div className="flex items-center gap-x-3 mt-auto">
            <button
              onClick={onRemove}
              className="flex items-center gap-x-1.5 text-xs text-card-foreground hover:text-destructive transition-colors cursor-pointer"
            >
              <Trash className="w-3.75 h-3.5" /> Supprimer
            </button>
            <span className="text-border">|</span>
            <button
              onClick={onStartEdit}
              className="flex items-center gap-x-1.5 text-xs text-card-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" /> Modifier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
