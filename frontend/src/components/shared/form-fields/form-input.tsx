import { Control, FieldValues, Path } from "react-hook-form";

// Composants UI Shadcn
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// types
interface FormInputProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  type = "text",
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="gap-x-0">
              {label}
              {required && <span aria-hidden="true">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              className="text-xs md:text-xs"
              placeholder={placeholder}
              aria-required={required}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
