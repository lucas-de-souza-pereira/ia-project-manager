"use client";

import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TASK_STATUS_DICT } from "@/config/task-status";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ChevronDown } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse, isValid } from "date-fns";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Check } from "lucide-react";

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
  assignees: z.array(z.string()),
});

const MOCK_USERS = [
  { id: "1", name: "Alice Dupont" },
  { id: "2", name: "Bob Martin" },
  { id: "3", name: "Charlie Leclerc" },
];

export function CreateTaskModal({ projectId }: { projectId: string }) {
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

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      assignees: [],
    },
  });

  async function onSubmit(values: z.infer<typeof createTaskSchema>) {
    console.log("Valeurs validées par Zod :", values);
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                    <FormLabel>Date d'échéance</FormLabel>
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
                name="assignees"
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
                        <Command filter={(value, search) => {
                          if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                          return 0;
                        }}>
                          <CommandInput placeholder="Rechercher un membre..." />
                          <CommandList>
                            <CommandEmpty>Aucun membre trouvé.</CommandEmpty>
                            <CommandGroup>
                              {MOCK_USERS.map((user) => {
                                const isSelected = field.value?.includes(
                                  user.id,
                                );
                                return (
                                  <CommandItem
                                    value={user.name}
                                    key={user.id}
                                    onSelect={() => {
                                      if (isSelected) {
                                        field.onChange(
                                          field.value.filter(
                                            (id) => id !== user.id,
                                          ),
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
                                        isSelected
                                          ? "opacity-100"
                                          : "opacity-0",
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

              <div className="flex">
                <Button variant="ghost">
                  <Badge className={TASK_STATUS_DICT["TODO"].tailwindClasses}>
                    {TASK_STATUS_DICT["TODO"].label}
                  </Badge>
                </Button>
                <Button variant="ghost">
                  <Badge
                    className={TASK_STATUS_DICT["IN_PROGRESS"].tailwindClasses}
                  >
                    {TASK_STATUS_DICT["IN_PROGRESS"].label}
                  </Badge>
                </Button>
                <Button variant="ghost">
                  <Badge className={TASK_STATUS_DICT["DONE"].tailwindClasses}>
                    {TASK_STATUS_DICT["DONE"].label}
                  </Badge>
                </Button>
              </div>

              <Button type="submit">Créer la tâche</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
