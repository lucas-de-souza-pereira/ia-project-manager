"use client";

import { useState } from "react";
import { generateTasksAIAction, type AIGeneratedTask } from "@/lib/actions/ai-tasks";
import { createTaskAction } from "@/lib/actions/tasks";
import { type CreateTaskData } from "@/types/task";



export function useManageTaskIA(projectId: string, onComplete: () => void) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<AIGeneratedTask[]>([]);
  const [error, setError] = useState<string | null>(null);

  // État local pour gérer l'édition d'une tâche générée
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  /**
   * Appelle l'API IA via la Server Action pour générer de nouvelles tâches.
   */
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    const res = await generateTasksAIAction(projectId, prompt);
    setIsLoading(false);

    if (!res.success) {
      setError(res.error || "Une erreur est survenue lors de la génération.");
      return;
    }

    setGeneratedTasks((prev) => [...prev, ...(res.data || [])]);
    setPrompt("");
  };

  /**
   * Enregistre toutes les tâches validées en base de données.
   */
  const handleSaveTasks = async () => {
    if (generatedTasks.length === 0) return;
    setIsSaving(true);
    setError(null);

    try {
      await Promise.all(
        generatedTasks.map((task) =>
          createTaskAction(projectId, {
            title: task.title,
            description: task.description,
            status: "TODO",
            priority: "MEDIUM",
            dueDate: "",
            assigneeIds: [],
          } as unknown as CreateTaskData)
        )
      );
      onComplete(); // Ferme la modale ou réinitialise
    } catch (err) {
      setError("Erreur lors de l'enregistrement des tâches.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeTask = (index: number) => {
    setGeneratedTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const startEditing = (index: number, task: AIGeneratedTask) => {
    setEditingIndex(index);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEditedTask = (index: number) => {
    setGeneratedTasks((prev) => {
      const copy = [...prev];
      copy[index] = { title: editTitle, description: editDesc };
      return copy;
    });
    setEditingIndex(null);
  };

  const cancelEditing = () => setEditingIndex(null);

  const reset = () => {
    setPrompt("");
    setGeneratedTasks([]);
    setError(null);
    setEditingIndex(null);
  };

  return {
    state: {
      prompt,
      isLoading,
      isSaving,
      generatedTasks,
      error,
      editingIndex,
      editTitle,
      editDesc,
      hasTasks: generatedTasks.length > 0
    },
    actions: {
      setPrompt,
      setEditTitle,
      setEditDesc,
      handleGenerate,
      handleSaveTasks,
      removeTask,
      startEditing,
      saveEditedTask,
      cancelEditing,
      reset
    }
  };
}
