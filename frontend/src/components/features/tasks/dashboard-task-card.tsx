import Link from "next/link";

// Composants UI Shadcn
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

// icons
import { Folder, Calendar, Comment } from "@/components/icons";

// types et actions
import { cn, formatFrenchDate } from "@/lib/utils";
import { type AssignedTask } from "@/types/task";
import { TASK_STATUS_DICT } from "@/config/task-status";

interface DashboardTaskCardProps {
  task: AssignedTask;
  variant?: "list" | "kanban";
}

function TaskMetadata({ task }: { task: DashboardTaskCardProps["task"] }) {
  return (
    <div className="flex items-center gap-x-3 text-sm text-muted-foreground font-medium">
      <div
        className="flex items-center gap-x-1.5"
        aria-label={`Projet : ${task.project.name}`}
      >
        <Folder className="w-4 h-4" aria-hidden="true" />
        <p>{task.project.name}</p>
      </div>

      <span className="text-gray-300 font-light">|</span>

      <div
        className="flex items-center gap-x-1.5"
        aria-label={`Date d'échéance : ${formatFrenchDate(task.dueDate)}`}
      >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <p>{formatFrenchDate(task.dueDate)}</p>
      </div>

      <span className="text-gray-300 font-light">|</span>

      <div
        className="flex items-center gap-x-1.5"
        aria-label={`Nombre de commentaires : ${task.commentsCount}`}
      >
        <Comment className="w-4 h-4" aria-hidden="true" />
        <p>{task.commentsCount}</p>
      </div>
    </div>
  );
}

export default function DashboardTaskCard({
  task,
  variant = "list",
}: DashboardTaskCardProps) {
  const isList = variant === "list";
  const statusConfig = TASK_STATUS_DICT[task.status];
  return (
    <Card
      className="py-4.5 px-6 xl:py-6.25 xl:px-10 h-full flex flex-col justify-between"
      aria-labelledby={`task-title-${task.id}`}
    >
      <CardHeader className="p-0 md:p-0 lg:p-0">
        <div className="contents">
          <CardTitle id={`task-title-${task.id}`}>{task.title}</CardTitle>
          <CardDescription className="col-span-full mt-1.75">
            {task.description}
          </CardDescription>
        </div>

        <CardAction className="row-span-1">
          <Badge className={statusConfig.tailwindClasses}>
            {statusConfig.label}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent
        className={`p-0 md:p-0 lg:p-0 flex ${isList ? "flex-col md:flex-row" : "flex-col"} items-start  md:justify-between gap-y-4 md:gap-y-8`}
      >
        <TaskMetadata task={task} />

        <CardAction>
          <Link
            href={`/projects/${task.projectId}`}
            aria-label={`Aller sur la page du projet : ${task.project.name}`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-30",
            )}
          >
            Voir
          </Link>
        </CardAction>
      </CardContent>
    </Card>
  );
}
