"use client";

import ProjectTasksCard from "./project-tasks-card";
import { ArrowLeft } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { type ProjectWithTasks } from "@/types/project";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Chips } from "@/components/shared/chips";
import { SquareCheck, Calendar } from "@/components/icons";
import { UserChip } from "@/components/shared/user-chip";
import { User } from "@/types/user";

export default function ProjectDetailView({
  project,
  currentUser,
}: {
  project: ProjectWithTasks;
  currentUser: User;
}) {
  const allTeamUsers = [
    { member: project.owner, role: "ADMIN" },
    ...project.members
      .filter((m) => m.user.id !== project.owner.id)
      .map((m) => ({ member: m.user, role: m.role })),
  ];
  const otherTeamMembers = allTeamUsers.filter(
    (item) => item.member.id !== project.ownerId,
  );
  const totalTeamMembers = allTeamUsers.length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="bg-white rounded-lg border-border">
          <ArrowLeft className="w-3.75" />
        </Button>

        <div className="flex flex-col">
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>

        <div className="flex">
          <Button variant="default" size="lg">
            + Ajouter une tâche
          </Button>
          <Button variant="default" size="lg">
            IA
          </Button>
        </div>
      </div>

      <div className="flex mt-15">
        <div className="flex gap-10">
          <h2>Contributeurs</h2>
          <p>{project.members.length} personnes</p>
        </div>
        <div className="flex gap-4">
          <UserChip
            user={currentUser}
            currentUserId={currentUser.id}
            ownerId={project.owner.id}
            variant="role"
          />
          <div className="flex items-center gap-2">
            {otherTeamMembers.map((item) => (
              <UserChip
                key={item.member.id}
                user={item.member}
                currentUserId={currentUser.id}
                ownerId={project.owner.id}
                variant="name"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-15">
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col">
            <h2>Tâches</h2>
            <p>{project.tasks.length} tâches</p>
          </div>

          <div className="flex gap-2">
            <Chips
              icon={<SquareCheck className="w-4 h-4" />}
              label="Liste"
              isActive={true}
              onClick={() => {
                console.log("Liste");
              }}
            />
            <Chips
              icon={<Calendar className="w-4 h-4" />}
              label="Kanban"
              isActive={false}
              onClick={() => {
                console.log("Kanban");
              }}
            />
            <p>Trier par</p>
            <p>input recherche</p>
          </div>
        </div>
      </div>

      {/* <ProjectTasksCard /> */}
    </div>
  );
}
