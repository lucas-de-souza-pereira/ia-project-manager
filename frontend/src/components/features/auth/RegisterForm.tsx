"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Logo } from "@/components/ui/logo/logo";

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
import { registerAction } from "@/lib/auth/actions";
import { ActionResult } from "@/types/actions";

const registerSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  email: z.string().email("Adresse email invalide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères."),
});

const initialState: ActionResult = { success: false, error: "" };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col h-full w-full py-8">
      <div className="flex-1 flex flex-col justify-start">
        <div className="mb-8 mx-auto">
          <Logo color="primary" />
        </div>
      </div>

      <div className="w-full">
        <div className="text-center mb-10">
          <h1 className="text-[40px] font-bold text-primary">Inscription</h1>
        </div>

        <Form {...form}>
          <form action={formAction} className="space-y-7 w-3/4 mx-auto">
            {!state.success && state.error && (
              <p
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-center"
              >
                {state.error}
              </p>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jean@abricot.fr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 mx-auto px-4.25">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? "Inscription en cours…" : "S'inscrire"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="pt-8 text-center text-sm font-medium tracking-wide">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            className="text-primary underline hover:font-semibold"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
