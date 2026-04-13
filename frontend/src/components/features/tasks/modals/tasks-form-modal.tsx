"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { format } from "date-fns";

// Composants UI Shadcn
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Composants de champs personnalisés (Shared)
import { FormInput } from "@/components/shared/form-fields/form-input";
import { DateField } from "@/components/shared/form-fields/date-field";
import { AssigneeSelector } from "@/components/shared/form-fields/assignee-selector";
import { StatusSelector } from "@/components/shared/form-fields/status-selector";

// Types et Validation
import { User } from "@/types/user";
import { Task } from "@/types/task";
import { createTaskSchema } from "@/lib/validation/task";

export default function TaskFormModal({
  initialData,
  projectMember = [],
  onSubmitAction,
}: {
  initialData?: Task;
  projectMember?: User[];
  onSubmitAction: (values: z.infer<typeof createTaskSchema>) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    mode: "onTouched",
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      dueDate: initialData?.dueDate
        ? format(new Date(initialData.dueDate), "dd/MM/yyyy")
        : "",
      assigneeIds: initialData?.assignees?.map((a) => a.userId) || [],
      status:
        (initialData?.status as "TODO" | "IN_PROGRESS" | "DONE") || "TODO",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description || "",
        dueDate: initialData.dueDate
          ? format(new Date(initialData.dueDate), "dd/MM/yyyy")
          : "",
        assigneeIds: initialData.assignees?.map((a) => a.userId) || [],
        status:
          (initialData.status as "TODO" | "IN_PROGRESS" | "DONE") || "TODO",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        dueDate: "",
        assigneeIds: [],
        status: "TODO",
      });
    }
  }, [initialData, form]);

  const isEdit = !!initialData;
  const buttonLabel = isEdit ? "Enregistrer" : "+ Ajouter une tâche";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6">
        <FormInput
          control={form.control}
          name="title"
          label="Titre"
          placeholder="Titre de la tâche"
          required
        />

        <FormInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Description de la tâche"
          required
        />

        <DateField
          control={form.control}
          name="dueDate"
          label="Échéance"
          placeholder="JJ/MM/AAAA"
          required
        />

        <AssigneeSelector
          control={form.control}
          name="assigneeIds"
          label="Assigné à"
          projectMember={projectMember}
          valueKey="id"
          required
        />

        <StatusSelector control={form.control} name="status" />

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="min-w-[150px]"
          >
            {form.formState.isSubmitting ? "Envoi..." : buttonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
