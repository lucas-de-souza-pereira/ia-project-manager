"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

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

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  password: z.string().min(1, "Le mot de passe est requis."),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Valeurs du formulaire de connexion:", values);
    // TODO: Connecter à l'API de backend
  }

  return (
    <div className="flex flex-col h-full w-full py-8">
      <div className="flex-1 flex flex-col justify-start">
        <div className="mb-8 mx-auto">
          <Logo color="primary" />
        </div>
      </div>

      <div className="w-full">
        <div className="text-center mb-10">
          <h1 className="text-[40px] font-bold text-primary">Connexion</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 w-3/4 mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="jean@abricot.fr"
                      {...field}
                    />
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
                    <Input className="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 mx-auto px-4.25">
              <Button type="submit" className="w-full" size="lg">
                Se connecter
              </Button>
              <div className="text-center">
                <Link
                  href="#"
                  className="text-sm tracking-wide text-primary underline hover:font-semibold"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="pt-8 text-center text-sm font-medium tracking-wide">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="text-primary underline hover:font-semibold"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
