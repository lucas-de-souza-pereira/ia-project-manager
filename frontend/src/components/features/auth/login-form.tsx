"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

// components shadcn ui
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// components custom
import { FormInput } from "@/components/shared/form-fields/form-input";

// icons
import { Logo } from "@/components/icons";

// types et action
import { loginSchema, type LoginInput } from "@/lib/validation/auth";
import { loginAction } from "@/lib/auth/actions";
import { ActionResult } from "@/types/actions";


const initialState: ActionResult = { success: false, error: "" };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col h-full w-full py-19">
      <div className="flex-1 flex flex-col justify-start">
        <div className="mb-8 mx-auto">
          <Logo className="w-63 h-8 text-primary" />
        </div>
      </div>

      <div className="w-full">
        <div className="text-center mb-10">
          <h1 className="text-[40px] font-bold text-primary">Connexion</h1>
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
                {isPending ? "Connexion en cours…" : "Se connecter"}
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
