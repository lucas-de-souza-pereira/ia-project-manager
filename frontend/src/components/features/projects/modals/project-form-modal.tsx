"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// Composants UI Shadcn
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Composants de champs personnalisés (Shared)
import { FormInput } from "@/components/shared/form-fields/form-input";
import { AssigneeSelector } from "@/components/shared/form-fields/assignee-selector";

// Types et Validation
import { User } from "@/types/user";
import { Project } from "@/types/project";
import { createProjectSchema } from "@/lib/validation/project";

export default function ProjectFormModal({
  initialData,
  contributors = [],
  onSubmitAction,
}: {
  initialData?: Project;
  contributors?: User[];
  onSubmitAction: (
    values: z.infer<typeof createProjectSchema>,
  ) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    mode: "onTouched",
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      contributors: initialData?.members?.map((a) => a.user.email) || [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description || "",
        contributors: initialData.members?.map((a) => a.user.email) || [],
      });
    } else {
      form.reset({
        name: "",
        description: "",
        contributors: [],
      });
    }
  }, [initialData, form]);

  const isEdit = !!initialData;
  const buttonLabel = isEdit ? "Enregistrer" : "Ajouter un projet";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6">
        <FormInput
          control={form.control}
          name="name"
          label="Titre"
          placeholder="Nom du projet"
          required
        />

        <FormInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Description du projet"
          required
        />

        <AssigneeSelector
          control={form.control}
          name="contributors"
          label="Assigné à"
          projectMember={contributors}
          required
        />

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
