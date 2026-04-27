"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

// components shadcn ui
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// components custom
import { FormInput } from "@/components/shared/form-fields/form-input";

// icons
import { Logo } from "@/components/icons/logo";

// types et action
import { ActionResult } from "@/types/actions";
import { registerAction } from "@/lib/auth/actions";
import { RegisterInput, registerSchema } from "@/lib/validation/auth";

const initialState: ActionResult = { success: false, error: "" };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <main className="flex flex-col h-full w-full py-19">
      <header className="flex-1 flex flex-col justify-start">
        <div className="mb-8 mx-auto">
          <Logo aria-hidden="true" className="w-63 h-8 text-primary" />
        </div>
      </header>

      <div className="w-full">
        <div className="text-center mb-10">
          <h1
            id="register-title"
            className="text-[40px] font-bold text-primary"
          >
            Inscription
          </h1>
        </div>

        <Form {...form}>
          <form
            action={formAction}
            aria-labelledby="register-title"
            className="space-y-7 w-3/4 mx-auto"
          >
            {!state.success && state.error && (
              <p
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-center"
              >
                {state.error}
              </p>
            )}

            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="jean@abricot.fr"
            />

            <FormInput
              control={form.control}
              name="password"
              label="Mot de passe"
              placeholder="Mot de passe"
              type="password"
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

      <footer className="flex-1 flex flex-col justify-end">
        <div className="pt-8 text-center text-sm font-medium tracking-wide">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            className="text-primary underline hover:font-semibold"
          >
            Se connecter
          </Link>
        </div>
      </footer>
    </main>
  );
}
