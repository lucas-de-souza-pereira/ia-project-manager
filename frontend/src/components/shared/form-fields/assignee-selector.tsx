import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

// Composants UI Shadcn
import {
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
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

// Icônes
import { Check } from "lucide-react";
import { ChevronDown } from "@/components/icons";

// types
import { type User } from "@/types/user";

interface AssigneeSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  projectMember: User[];
  valueKey?: "id" | "email";
}

export function AssigneeSelector<T extends FieldValues>({
  control,
  name,
  label,
  required,
  projectMember,
  valueKey = "email",
}: AssigneeSelectorProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel className="gap-x-0">
              {label}
              {required && <span aria-hidden="true">*</span>}
            </FormLabel>
          )}
          <Popover>
            <FormControl>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-xs md:text-xs",
                      !field.value?.length && "text-muted-foreground",
                    )}
                  />
                }
              >
                {field.value?.length > 0
                  ? `${field.value.length} ${field.value.length > 1 ? "collaborateurs" : "collaborateur"}`
                  : "Choisir un ou plusieurs collaborateurs"}
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
                      const isSelected = field.value?.includes(user[valueKey]);
                      return (
                        <CommandItem
                          value={user.name || user.email}
                          key={user[valueKey]}
                          onSelect={() => {
                            if (isSelected) {
                              field.onChange(
                                (field.value || []).filter(
                                  (val: string) => val !== user[valueKey],
                                ),
                              );
                            } else {
                              field.onChange([
                                ...(field.value || []),
                                user[valueKey],
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
                          {user.name || user.email}
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
  );
}
