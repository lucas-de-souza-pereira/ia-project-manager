"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { format, parse, isValid } from "date-fns";

// Configuration et Utilitaires
import { cn } from "@/lib/utils";
import { TASK_STATUS_DICT } from "@/config/task-status";

// Composants UI Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

// Icônes
import { Check } from "lucide-react";
import { Calendar as CalendarIcon, ChevronDown } from "@/components/icons";

// Types
import { User } from "@/types/user";
import { Task } from "@/types/task";

const createTaskSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().min(1, "La description est requise."),
  dueDate: z
    .string()
    .min(1, "La date d'échéance est requise.")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Le format doit être JJ/MM/AAAA",
    )
    .refine(
      (val) => {
        const parsed = parse(val, "dd/MM/yyyy", new Date());
        return isValid(parsed);
      },
      { message: "Cette date n'existe pas dans le calendrier." },
    ),
  assigneeIds: z.array(z.string()),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

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

  async function onSubmit(values: z.infer<typeof createTaskSchema>) {
    await onSubmitAction(values);
  }

  const isEdit = !!initialData;
  const buttonLabel = isEdit ? "Enregistrer" : "+ Ajouter une tâche";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre*</FormLabel>
              <FormControl>
                <Input placeholder="Titre de la tâche" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Input placeholder="Description de la tâche" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date d'échéance*</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    placeholder="JJ/MM/AAAA"
                    maxLength={10}
                    className="pr-10"
                    {...field}
                  />
                </FormControl>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:bg-transparent hover:text-foreground"
                      />
                    }
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={(() => {
                        if (!field.value || field.value.length !== 10)
                          return undefined;
                        const parsed = parse(
                          field.value,
                          "dd/MM/yyyy",
                          new Date(),
                        );
                        return isValid(parsed) ? parsed : undefined;
                      })()}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(format(date, "dd/MM/yyyy"));
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assigneeIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Assigné à</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-between",
                          !field.value?.length && "text-muted-foreground",
                        )}
                      />
                    }
                  >
                    {field.value?.length > 0
                      ? `${field.value.length} personne(s) assignée(s)`
                      : "Sélectionner des membres"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </PopoverTrigger>
                </FormControl>

                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command
                    filter={(value, search) => {
                      if (value.toLowerCase().includes(search.toLowerCase()))
                        return 1;
                      return 0;
                    }}
                  >
                    <CommandInput placeholder="Rechercher un membre..." />
                    <CommandList>
                      <CommandEmpty>Aucun membre trouvé.</CommandEmpty>
                      <CommandGroup>
                        {projectMember.map((user) => {
                          const isSelected = field.value?.includes(user.id);
                          return (
                            <CommandItem
                              value={user.name}
                              key={user.id}
                              onSelect={() => {
                                if (isSelected) {
                                  field.onChange(
                                    field.value.filter((id) => id !== user.id),
                                  );
                                } else {
                                  field.onChange([
                                    ...(field.value || []),
                                    user.id,
                                  ]);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  isSelected ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {user.name}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Statut</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {(["TODO", "IN_PROGRESS", "DONE"] as const).map((status) => {
                    const isSelected = field.value === status;
                    return (
                      <Button
                        key={status}
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-auto px-3 py-2 border-2 transition-all",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-transparent",
                        )}
                        onClick={() => field.onChange(status)}
                      >
                        <Badge
                          className={TASK_STATUS_DICT[status].tailwindClasses}
                        >
                          {TASK_STATUS_DICT[status].label}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
