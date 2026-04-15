import { Control, FieldValues, Path } from "react-hook-form";
import { parse, format, isValid } from "date-fns";

// Composants UI Shadcn
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

// icons
import { Calendar as CalendarIcon } from "@/components/icons";

interface DateFieldProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
}

export function DateField<T extends FieldValues>({
  control,
  name,
  label,
  required,
}: DateFieldProps<T>) {
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
          <div className="relative w-full">
            <FormControl>
              <Input
                placeholder="JJ/MM/AAAA"
                maxLength={10}
                className="pr-10 text-xs md:text-xs"
                aria-required={required}
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
                    className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:bg-transparent hover:text-foreground "
                  />
                }
              >
                <CalendarIcon className="h-4 w-4 mr-3.5" />
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={(() => {
                    if (!field.value || field.value.length !== 10)
                      return undefined;
                    const parsed = parse(field.value, "dd/MM/yyyy", new Date());
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
  );
}
