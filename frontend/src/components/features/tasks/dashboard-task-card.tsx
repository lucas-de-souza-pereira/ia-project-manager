import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Folder, Calendar, Comment } from "@/components/icons";

import { type Task } from "@/types/task";

interface DashboardTaskCardProps {
  task: Task;
  variant?: "list" | "kanban";
}

function TaskMetadata({ task }: { task: DashboardTaskCardProps["task"] }) {
  return (
    <div className="flex items-center gap-x-3 text-sm text-muted-foreground font-medium">
      <div className="flex items-center gap-x-1.5">
        <Folder className="w-4 h-4" />
        <p>{task.project.name}</p>
      </div>

      <span className="text-gray-300 font-light">|</span>

      <div className="flex items-center gap-x-1.5">
        <Calendar className="w-4 h-4" />
        <p>{task.dueDate}</p>
      </div>

      <span className="text-gray-300 font-light">|</span>

      <div className="flex items-center gap-x-1.5">
        <Comment className="w-4 h-4" />
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
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-y-1.75">
          <h3>
            <CardTitle>{task.title}</CardTitle>
          </h3>
          <CardDescription>{task.description}</CardDescription>
        </div>
        <CardAction>
          <Badge variant={task.status}>{task.status}</Badge>
        </CardAction>
      </CardHeader>

      <CardContent
        className={`flex ${isList ? "flex-col md:flex-row" : "flex-col"} items-start md:items-center md:justify-between gap-y-4 md:gap-y-8`}
      >
        <TaskMetadata task={task} />

        <CardAction>
          <Button variant="default" size="lg">
            Voir
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}
