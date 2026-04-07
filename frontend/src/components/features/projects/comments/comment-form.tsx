"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Le commentaire ne peut pas être vide.")
    .max(500, "Maximum 500 caractères."),
});

export function CommentForm({
  onAddComment,
}: {
  onAddComment: (content: string) => void;
}) {
  const { initials } = useAuth();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const onHandleSubmit = (values: z.infer<typeof commentSchema>) => {
    onAddComment(values.content);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onHandleSubmit)}
        className="flex gap-x-3.5 w-full"
      >
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 bg-[#F3F4F6] rounded-lg p-3.5 px-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Ajouter un commentaire..."
                    className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[40px] text-sm outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              size="lg"
              className="bg-[#E5E7EB] hover:bg-primary/90 text-foreground transition-all"
            >
              Envoyer
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
