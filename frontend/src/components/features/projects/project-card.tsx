import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import Link from "next/link";
import { type Project } from "@/types/project";
import { getUserInitials } from "@/lib/utils";
import { type User } from "@/types/user";
import { getAvatarRole } from "@/config/user-role";
import { UserChip } from "@/components/shared/user-chip";

interface ProjectCardProps {
  project: Project;
  currentUser: User;
}

export default function ProjectCard({
  project,
  currentUser,
}: ProjectCardProps) {
  const allTeamUsers = [
    { member: project.owner, role: "ADMIN" },
    ...project.members
      .filter((member) => member.user.id !== project.owner.id)
      .map((member) => ({
        member: member.user,
        role: member.role,
      })),
  ];

  const otherTeamMembers = allTeamUsers.filter(
    (teamMember) => teamMember.member.id !== currentUser.id,
  );
  const totalTeamMembers = allTeamUsers.length;
  return (
    <Link href={`/projects/${project.id}`}>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-y-1.75">
            <h2>
              <CardTitle>{project.name}</CardTitle>
            </h2>
            <CardDescription>{project.description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <p>Progression</p>
            <p>{project.progress}%</p>
          </div>
          <Progress value={project.progress ? project.progress : 0} />
          <p>
            {project.completedTasksCount}/{project._count.tasks} tâches
            terminées
          </p>

          <div className="flex flex-col items-start gap-x-2 mt-8">
            <p>Equipe ({totalTeamMembers})</p>
            <div className="flex gap-2 items-center">
              <UserChip
                user={currentUser}
                currentUserId={currentUser.id}
                ownerId={project.owner.id}
                variant="role"
              />
              <Avatar>
                <AvatarGroup>
                  {otherTeamMembers?.map((item) => (
                    <Avatar key={item.member.id}>
                      <AvatarFallback
                        className={`size-6.75 ${getAvatarRole(item.role)}`}
                      >
                        {getUserInitials(item.member.name)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
