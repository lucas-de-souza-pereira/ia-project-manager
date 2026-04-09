import { Control, FieldValues, Path } from "react-hook-form";

// Configuration et Utilitaires
import { cn } from "@/lib/utils";
import { TASK_STATUS_DICT } from "@/config/task-status";

// Composants UI Shadcn
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// types

interface StatusSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function StatusSelector<T extends FieldValues>({
  control,
  name,
}: StatusSelectorProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Statut</FormLabel>
          <FormControl>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Sélectionner le statut de la tâche"
            >
              {(["TODO", "IN_PROGRESS", "DONE"] as const).map((status) => {
                const isSelected = field.value === status;
                return (
                  <Button
                    key={status}
                    type="button"
                    variant="ghost"
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    className={cn(
                      "h-auto px-3 py-2 border-2 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-transparent",
                    )}
                    onClick={() => field.onChange(status)}
                  >
                    <Badge className={TASK_STATUS_DICT[status].tailwindClasses}>
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
  );
}
