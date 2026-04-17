"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components shadcn ui
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// components custom
import { FormInput } from "@/components/shared/form-fields/form-input";

// types et actions
import { UserProfile } from "@/types/user";
import { type ProfileData, profileSchema } from "@/lib/validation/profile";
import { updateProfileAction, updatePasswordAction } from "@/lib/actions/users";

export default function ProfileForm({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      lastName: userProfile.lastName,
      firstName: userProfile.firstName,
      email: userProfile.email,
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmitAction = async (values: ProfileData) => {
    setError(null);
    setSuccess(null);

    const hasProfileChanged =
      values.firstName !== userProfile.firstName ||
      values.lastName !== userProfile.lastName ||
      values.email !== userProfile.email;

    if (hasProfileChanged) {
      const res = await updateProfileAction(values);
      if (res.success) {
        if (isNewUser) {
          startTransition(() => {
            router.push("/dashboard");
            router.refresh();
          });
          return;
        }
      }
      if (!res.success) {
        setError(
          res.error || "Une erreur est survenue lors de la modification.",
        );
        return;
      }
    }

    if (values.currentPassword && values.newPassword) {
      const res = await updatePasswordAction({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (!res.success) {
        setError(
          res.error ||
            "Une erreur est survenue lors de la modification du mot de passe.",
        );
        return;
      }
    }

    if (!hasProfileChanged && !values.newPassword) {
      setError("Aucune modification n'a été détectée.");
      return;
    }
    router.refresh();
    setSuccess("Informations modifiées avec succès.");
  };

  const isNewUser = !userProfile.firstName && !userProfile.lastName;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitAction)}
        aria-labelledby="profile-title"
        className="space-y-6"
      >
        {isNewUser && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Bienvenue !
            </h2>
            <p className="text-muted-foreground">
              Veuillez compléter votre profil pour commencer à utiliser ABRICOT.
            </p>
          </div>
        )}
        {error && (
          <p
            role="alert"
            className="text-sm border border-destructive text-destructive bg-destructive/10 rounded-md p-3 mb-4 text-center"
          >
            {error}
          </p>
        )}
        {success && (
          <p
            aria-live="polite"
            className="text-sm text-primary border border-primary-light text-success bg-card/10 rounded-md p-3 mb-4 text-center"
          >
            {success}
          </p>
        )}
        <FormInput control={form.control} name="lastName" label="Nom" />

        <FormInput control={form.control} name="firstName" label="Prénom" />
        {!isNewUser && (
          <>
            <FormInput control={form.control} name="email" label="Email" />

            <FormInput
              control={form.control}
              name="currentPassword"
              label="Mot de passe actuel"
              type="password"
            />

            <FormInput
              control={form.control}
              name="newPassword"
              label="Nouveau mot de passe"
              type="password"
              onChange={(e) => {
                form.setValue("newPassword", e.target.value);
                if (e.target.value.length > 3) {
                  form.trigger("currentPassword");
                } else {
                  form.clearErrors("currentPassword");
                }
              }}
            />
          </>
        )}

        <div className="flex justify-start pt-4">
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="min-w-[150px]"
          >
            {form.formState.isSubmitting
              ? "Modification en cours..."
              : "Modifier les informations"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
