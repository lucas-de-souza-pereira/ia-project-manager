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
import { UserGroup } from "@/components/icons";

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
      <Card className="px-4 py-5 md:px-6.25 md:py-6.25 lg:px-8.5 lg:py-7.5 h-full flex flex-col justify-between">
        <CardHeader className="p-0 md:p-0 lg:p-0">
          <div className="flex flex-col items-start justify-between gap-y-1.75">
            <CardTitle variant="h2">{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0 md:p-0 lg:p-0">
          <div className="flex items-center justify-between">
            <p className="text-xs">Progression</p>
            <p className="text-xs text-heading">{project.progress}%</p>
          </div>
          <Progress
            value={project.progress ? project.progress : 0}
            className="mt-3.75"
          />
          <p className="text-[10px] mt-2">
            {project.completedTasksCount}/{project._count.tasks} tâches
            terminées
          </p>

          <div className="flex flex-col items-start gap-x-2 mt-8">
            <div className="flex items-center gap-x-2">
              <UserGroup className="size-2.75" />
              <p className="text-[10px]">Équipe ({totalTeamMembers})</p>
            </div>
            <div className="flex gap-2 items-center mt-3.75">
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
                        className={`size-6.75 text-[10px] ${getAvatarRole(item.role)}`}
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
