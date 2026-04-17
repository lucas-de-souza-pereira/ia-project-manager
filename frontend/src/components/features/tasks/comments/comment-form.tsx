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
        className="flex flex-col gap-y-2 w-full"
      >
        <div className="flex gap-x-3.5">
          <Avatar aria-hidden="true" className="hidden md:block">
            <AvatarFallback className="text-[#0F0F0F] bg-primary-light text-[10px] border border-card">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 bg-background rounded-lg p-4.5 px-3.5 h-[83px]">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Ajouter un commentaire..."
                      className="w-full bg-background border-none focus:ring-0 resize-none h-full overflow-y-auto text-xs md:text-[10px] text-foreground outline-none"
                      aria-label="Écrire un commentaire"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            size="lg"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="px-18.5 py-3.25"
          >
            {form.formState.isSubmitting ? "Envoi..." : "Envoyer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
