"use client";

import { useState } from "react";
import { UserProfile } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form-fields/form-input";

import { type ProfileData, profileSchema } from "@/lib/validation/profile";
import { updateProfileAction, updatePasswordAction } from "@/lib/actions/users";

export default function ProfileForm({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
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

    setSuccess("Informations modifiées avec succès.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6">
        {error && (
          <p className="text-sm border border-destructive text-destructive bg-destructive/10 rounded-md p-3 mb-4 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm border border-success text-success bg-success/10 rounded-md p-3 mb-4 text-center">
            {success}
          </p>
        )}
        <FormInput control={form.control} name="lastName" label="Nom" />

        <FormInput control={form.control} name="firstName" label="Prénom" />

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
        />

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="min-w-[150px]"
          >
            {form.formState.isSubmitting
              ? "Envoi..."
              : "Modifier les informations"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
