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

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
            <p>0%</p>
          </div>
          <Progress value={0} />
          <p>0/0 tâches terminées</p>

          <div className="flex flex-col items-start gap-x-2 mt-8">
            <p>Equipe ({project.members.length})</p>
            <div>
              <Avatar>
                <AvatarFallback className="size-6.75">U</AvatarFallback>
              </Avatar>
              <Badge variant="owner">Propriétaire</Badge>
              <Avatar>
                <AvatarGroup>
                  <AvatarFallback className="size-6.75">X</AvatarFallback>
                  <AvatarFallback className="size-6.75">Y</AvatarFallback>
                  <AvatarFallback className="size-6.75">Z</AvatarFallback>
                </AvatarGroup>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
