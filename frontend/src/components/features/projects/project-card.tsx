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
import { Badge } from "@/components/ui/badge";
import { getUserInitials } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  userName: string;
}

export default function ProjectCard({ project, userName }: ProjectCardProps) {
  const allTeamUsers = [...project.members.map((member) => member.user)];
  const otherTeamMembers = allTeamUsers.filter(
    (member) => member.name !== userName,
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
              <Avatar>
                <AvatarFallback className="size-6.75">
                  {getUserInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <Badge variant="user">{project.userRole}</Badge>
              <Avatar>
                <AvatarGroup>
                  {otherTeamMembers.map((member) => (
                    <Avatar key={member.id}>
                      <AvatarFallback
                        className={`size-6.75 ${project.userRole === "ADMIN" ? "owner" : "user"}`}
                      >
                        {getUserInitials(member.name)}
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
