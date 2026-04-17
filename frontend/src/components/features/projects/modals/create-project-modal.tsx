"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Composants UI Shadcn
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Composants de formulaire
import ProjectFormModal from "./project-form-modal";

// Types et Actions
import { CreateProjectData } from "@/types/project";
import { User } from "@/types/user";
import { createProjectAction } from "@/lib/actions/projects";
import { getUsersAction } from "@/lib/actions/users";

export function CreateProjectModal({ currentUser }: { currentUser: User }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const isOpen = searchParams.get("modal") === "create-project";

  useEffect(() => {
    async function loadUsers() {
      if (isOpen && users.length === 0) {
        const res = await getUsersAction();
        if (res.success && res.data) {
          const users = res.data.filter((user) => user.id !== currentUser.id);
          setUsers(users);
        }
      }
    }
    loadUsers();
  }, [isOpen, users.length]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("modal");
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    }
  };

  const handleSubmit = async (values: CreateProjectData) => {
    setError(null);
    const res = await createProjectAction(values);
    if (!res.success) {
      setError(res.error || "Une erreur est survenue lors de la création.");
      return;
    }
    router.replace(`/projects/${res.data?.id}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer un projet</DialogTitle>
          <DialogDescription className="sr-only">
            Formulaire pour créer un nouveau projet
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {error && (
            <p
              role="alert"
              className="text-sm border border-destructive text-destructive bg-destructive/10 rounded-md p-3 mb-4 text-center"
            >
              {error}
            </p>
          )}
          <ProjectFormModal
            contributors={users}
            onSubmitAction={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
