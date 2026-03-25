import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Folder, Calendar, Comment } from "@/components/icons";

interface DashboardTaskCardProps {
  task: {
    title: string;
    description: string;
    status: "todo" | "doing" | "done";
    dueDate: string;
    commentsCount: number;
    project: {
      name: string;
    };
  };
  variant?: "list" | "kanban";
}

export default function DashboardTaskCard({
  task,
  variant = "list",
}: DashboardTaskCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between">
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </div>
        <CardAction>
          <Badge variant={task.status}>{task.status}</Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
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

        <CardAction>
          <Button variant="default" size="lg">
            Voir
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}
