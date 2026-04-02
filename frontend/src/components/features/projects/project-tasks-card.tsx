import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Task } from "@/types/task";
import { User } from "@/types/user";
import { Calendar } from "@/components/icons";
import { formatFrenchDate } from "@/lib/utils";

interface ProjectTasksCardProps {
  task: Task;
  user: User;
}

export default function ProjectTasksCard({
  task,
  user,
}: ProjectTasksCardProps) {
  return (
    <div>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="flex">
        <p>Échéance :</p>
        <p>
          <Calendar className="w-3.75 h-4" /> {formatFrenchDate(task.dueDate)}
        </p>

        <div className="flex">
          <p>Assigné à :</p>
        </div>
      </div>
    </div>
  );
}
